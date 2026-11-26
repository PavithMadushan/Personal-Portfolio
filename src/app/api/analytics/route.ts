
import { NextRequest, NextResponse } from "next/server";
import { getContext } from "@netlify/functions";
import { supabaseAdmin } from "@/lib/supabase/admin";

// Run this route in the Node.js runtime.
export const runtime = "nodejs";

// Basic UUID validation for visitor and session IDs.
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Restrict text values received from the browser.
function cleanText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;

  const cleaned = value.trim();
  return cleaned ? cleaned.slice(0, maxLength) : null;
}

export async function POST(request: NextRequest) {
  try {
    // Accept requests from the same site only.
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");

    if (!origin || !host || new URL(origin).host !== host) {
      return NextResponse.json(
        { success: false, message: "Invalid request origin." },
        { status: 403 }
      );
    }

    const body = await request.json();

    const visitorId = body.visitorId;
    const sessionId = body.sessionId;
    const pagePath = cleanText(body.pagePath, 500);

    // Validate the required identifiers and page path.
    if (
      typeof visitorId !== "string" ||
      !UUID_REGEX.test(visitorId) ||
      typeof sessionId !== "string" ||
      !UUID_REGEX.test(sessionId) ||
      !pagePath ||
      !pagePath.startsWith("/")
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid analytics data." },
        { status: 400 }
      );
    }

    // Read approximate location supplied by Netlify.
    // This may be unavailable during local development.
    let country: string | null = null;
    let countryCode: string | null = null;
    let region: string | null = null;
    let city: string | null = null;

    try {
      const context = getContext();
      country = context.geo?.country?.name ?? null;
      countryCode = context.geo?.country?.code ?? null;
      region = context.geo?.subdivision?.name ?? null;
      city = context.geo?.city ?? null;
    } catch {
      // No Netlify request context is available locally.
    }

    // Read browser/device information supplied by the frontend.
    const deviceType = cleanText(body.deviceType, 50);
    const browser = cleanText(body.browser, 100);
    const operatingSystem = cleanText(body.operatingSystem, 100);
    const referrer = cleanText(body.referrer, 1000);

    // Check whether this session already exists.
    const { data: existingSession, error: lookupError } =
      await supabaseAdmin
        .from("visitor_sessions")
        .select("id")
        .eq("id", sessionId)
        .maybeSingle();

    if (lookupError) {
      throw lookupError;
    }

    if (existingSession) {
      // Update the existing session without changing its original
      // first-seen time or landing page.
      const { error: updateError } = await supabaseAdmin
        .from("visitor_sessions")
        .update({
          last_seen_at: new Date().toISOString(),
          country,
          country_code: countryCode,
          region,
          city,
          device_type: deviceType,
          browser,
          operating_system: operatingSystem,
        })
        .eq("id", sessionId);

      if (updateError) throw updateError;
    } else {
      // Create a new visitor session.
      const { error: insertError } = await supabaseAdmin
        .from("visitor_sessions")
        .insert({
          id: sessionId,
          visitor_id: visitorId,
          last_seen_at: new Date().toISOString(),
          country,
          country_code: countryCode,
          region,
          city,
          device_type: deviceType,
          browser,
          operating_system: operatingSystem,
          referrer,
          landing_page: pagePath,
        });

      if (insertError) throw insertError;
    }

    // Record this page view.
    const { error: pageViewError } = await supabaseAdmin
      .from("page_views")
      .insert({
        session_id: sessionId,
        page_path: pagePath,
      });

    if (pageViewError) throw pageViewError;

    return NextResponse.json(
      { success: true },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    // Keep detailed errors in server logs, not in the public response.
    console.error("Analytics API error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to record analytics." },
      { status: 500 }
    );
  }
}
