
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  ADMIN_COOKIE_NAME,
  verifyAdminSessionToken,
} from "@/lib/analytics/auth";

import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { AdminAnalyticsDashboard } from "@/components/admin/AdminAnalyticsDashboard";

export const metadata = {
  title: "Portfolio Analytics | Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardPage() {
  // Verify the administrator session on the server.
  const cookieStore = await cookies();

  const sessionToken = cookieStore.get(
    ADMIN_COOKIE_NAME
  )?.value;

  if (!verifyAdminSessionToken(sessionToken)) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Dashboard Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <p className="text-sm font-medium text-primary">
              PRIVATE ADMIN AREA
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Portfolio Analytics
            </h1>

            <p className="mt-2 text-muted-foreground">
              Monitor visitors and understand how people interact
              with your portfolio.
            </p>
          </div>

          <AdminLogoutButton />

        </div>

        {/* Analytics Dashboard */}
        <AdminAnalyticsDashboard />

      </div>
    </main>
  );
}
