
import "server-only";

import {
  createHash,
  timingSafeEqual,
} from "crypto";

// Verify the administrator password.
// This module should only be imported by the login API route.
export function verifyAdminPassword(password: string): boolean {
  const expectedPassword =
    process.env["ANALYTICS_ADMIN_PASSWORD"];

  if (!expectedPassword) {
    throw new Error(
      "ANALYTICS_ADMIN_PASSWORD is not configured."
    );
  }

  const submittedHash = createHash("sha256")
    .update(password)
    .digest();

  const expectedHash = createHash("sha256")
    .update(expectedPassword)
    .digest();

  return timingSafeEqual(submittedHash, expectedHash);
}
