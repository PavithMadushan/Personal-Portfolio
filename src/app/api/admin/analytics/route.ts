
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { supabaseAdmin } from "@/lib/supabase/admin";

import {
  ADMIN_COOKIE_NAME,
  verifyAdminSessionToken,
} from "@/lib/analytics/auth";

export const runtime = "nodejs";

// GET: Retrieve portfolio analytics
export async function GET(request: NextRequest) {
  try {
    // 1. Read the admin session cookie
    const cookieStore = await cookies();

    const sessionToken = cookieStore.get(
      ADMIN_COOKIE_NAME
    )?.value;

    // 2. Verify the admin session
    const isAuthenticated =
      verifyAdminSessionToken(sessionToken);

    if (!isAuthenticated) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please log in.",
        },
        {
          status: 401,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }

    // 3. Retrieve analytics from Supabase
    const { data, error } = await supabaseAdmin.rpc(
      "get_portfolio_analytics"
    );

    // 4. Handle Supabase errors
    if (error) {
      console.error("Analytics retrieval error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to retrieve analytics data.",
        },
        {
          status: 500,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }

    // 5. Return analytics data
    return NextResponse.json(
      {
        success: true,
        data,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

  } catch (error) {
    console.error("Admin analytics API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
