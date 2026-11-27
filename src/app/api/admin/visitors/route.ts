
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  ADMIN_COOKIE_NAME,
  verifyAdminSessionToken,
} from "@/lib/analytics/auth";

export const runtime = "nodejs";

// Return every visitor session, newest activity first.
export async function GET(_request: NextRequest) {
  try {
    // Verify the admin session.
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

    if (!verifyAdminSessionToken(sessionToken)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    // Fetch all visitor sessions in batches.
    const sessions: any[] = [];
    const batchSize = 1000;

    for (let offset = 0; ; offset += batchSize) {
      const { data, error } = await supabaseAdmin
        .from("visitor_sessions")
        .select(`
          id,
          visitor_id,
          first_seen_at,
          last_seen_at,
          country,
          country_code,
          region,
          city,
          device_type,
          browser,
          operating_system,
          referrer,
          landing_page,
          created_at
        `)
        .order("last_seen_at", { ascending: false })
        .range(offset, offset + batchSize - 1);

      if (error) throw error;

      sessions.push(...(data ?? []));

      if (!data || data.length < batchSize) break;
    }

    // Prepare page-view details for each session.
    const pageViewsBySession: Record<
      string,
      { page_path: string; viewed_at: string }[]
    > = {};

    // Query page views in smaller session-ID batches.
    for (let i = 0; i < sessions.length; i += 100) {
      const sessionIds = sessions
        .slice(i, i + 100)
        .map((session) => session.id);

      const pageViews: any[] = [];
      const pageViewBatchSize = 1000;

      for (let offset = 0; ; offset += pageViewBatchSize) {
        const { data, error } = await supabaseAdmin
          .from("page_views")
          .select("session_id, page_path, viewed_at")
          .in("session_id", sessionIds)
          .order("viewed_at", { ascending: false })
          .range(offset, offset + pageViewBatchSize - 1);

        if (error) throw error;

        pageViews.push(...(data ?? []));

        if (!data || data.length < pageViewBatchSize) break;
      }

      for (const view of pageViews) {
        if (!pageViewsBySession[view.session_id]) {
          pageViewsBySession[view.session_id] = [];
        }

        pageViewsBySession[view.session_id].push({
          page_path: view.page_path,
          viewed_at: view.viewed_at,
        });
      }
    }

    // Combine visitor sessions with their page-view details.
    const visitors = sessions.map((session) => ({
      ...session,
      page_views: pageViewsBySession[session.id] ?? [],
    }));

    return NextResponse.json(
      {
        success: true,
        total: visitors.length,
        visitors,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Visitor details API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to retrieve visitor details.",
      },
      { status: 500 }
    );
  }
}
