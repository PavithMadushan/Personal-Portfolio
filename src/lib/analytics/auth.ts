import "server-only";

import { createHash, createHmac, timingSafeEqual } from "crypto";

// Name of the browser cookie used for admin authentication.
export const ADMIN_COOKIE_NAME = "analytics_admin_session";

// Keep admin sessions valid for 24 hours.
export const ADMIN_SESSION_DURATION = 60 * 60 * 24;

// Read secrets dynamically so their values are not statically
// substituted into generated JavaScript during the build.
function getSecret(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

function getSessionSecret(): string {
  const secret = getSecret("ANALYTICS_SESSION_SECRET");

  if (secret.length < 32) {
    throw new Error(
      "ANALYTICS_SESSION_SECRET must contain at least 32 characters.",
    );
  }

  return secret;
}

// Compare passwords without a direct timing-sensitive string comparison.
export function verifyAdminPassword(password: string): boolean {
  const expectedPassword = getSecret("ANALYTICS_ADMIN_PASSWORD");

  const submittedHash = createHash("sha256").update(password).digest();

  const expectedHash = createHash("sha256").update(expectedPassword).digest();

  return timingSafeEqual(submittedHash, expectedHash);
}

// Create a signed session token containing its expiration time.
export function createAdminSessionToken(): string {
  const expiresAt = Math.floor(Date.now() / 1000) + ADMIN_SESSION_DURATION;

  const signature = createHmac("sha256", getSessionSecret())
    .update(String(expiresAt))
    .digest("hex");

  return `${expiresAt}.${signature}`;
}

// Verify the session's signature and expiration time.
export function verifyAdminSessionToken(token: string | undefined): boolean {
  if (!token) return false;

  const [expiresAtString, signature] = token.split(".");

  
  if (
    !expiresAtString ||
    !signature ||
    !/^\d+$/.test(expiresAtString) ||
    !/^[a-f0-9]{64}$/i.test(signature)
  ) {
    return false;
  }

  const expiresAt = Number(expiresAtString);

  if (
    !Number.isSafeInteger(expiresAt) ||
    expiresAt <= Math.floor(Date.now() / 1000)
  ) {
    return false;
  }

  const expectedSignature = createHmac("sha256", getSessionSecret())
    .update(expiresAtString)
    .digest();

  const submittedSignature = Buffer.from(signature, "hex");

  return timingSafeEqual(expectedSignature, submittedSignature);
}
