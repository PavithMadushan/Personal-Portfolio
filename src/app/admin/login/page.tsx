import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import {
  ADMIN_COOKIE_NAME,
  verifyAdminSessionToken,
} from "@/lib/analytics/auth";

export const metadata = {
  title: "Admin Login | Portfolio Analytics",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  // If the user already has a valid session, skip the login page.
  if (verifyAdminSessionToken(sessionToken)) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="text-2xl">🔐</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            Analytics Dashboard
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to access your portfolio analytics.
          </p>
        </div>

        <AdminLoginForm />

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Private administrator access
        </p>
      </div>
    </main>
  );
}