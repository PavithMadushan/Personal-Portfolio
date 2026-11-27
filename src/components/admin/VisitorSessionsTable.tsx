
"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

type PageView = {
  page_path: string;
  viewed_at: string;
};

type VisitorSession = {
  id: string;
  visitor_id: string;
  first_seen_at: string;
  last_seen_at: string;
  country: string | null;
  country_code: string | null;
  region: string | null;
  city: string | null;
  device_type: string | null;
  browser: string | null;
  operating_system: string | null;
  referrer: string | null;
  landing_page: string | null;
  created_at: string;
  page_views: PageView[];
};

function formatDateTime(value: string | null) {
  if (!value) return "—";

  return new Date(value).toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function displayValue(value: string | null | undefined) {
  return value?.trim() || "—";
}

export function VisitorSessionsTable() {
  const [visitors, setVisitors] = useState<VisitorSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVisitors = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/visitors", {
        method: "GET",
        cache: "no-store",
      });

      if (response.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to load visitor details."
        );
      }

      setVisitors(result.visitors ?? []);
    } catch (err) {
      console.error("Visitor table error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchVisitors();
  }, [fetchVisitors]);

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <Users className="h-5 w-5" />
          </div>

          <div>
            <h2 className="font-semibold">Visitor Details</h2>
            <p className="text-xs text-muted-foreground">
              All recorded visitor sessions, newest activity first
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {visitors.length} sessions
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={fetchVisitors}
            disabled={isLoading}
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${
                isLoading ? "animate-spin" : ""
              }`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
          <Button
            variant="outline"
            size="sm"
            className="ml-3"
            onClick={fetchVisitors}
          >
            Try again
          </Button>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="py-12 text-center text-sm text-muted-foreground">
          Loading visitor details...
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && visitors.length === 0 && (
        <div className="py-12 text-center text-sm text-muted-foreground">
          No visitor sessions recorded yet.
        </div>
      )}

      {/* Table */}
      {!isLoading && visitors.length > 0 && (
        <div className="w-full overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[1800px] border-collapse text-left text-sm">
            <thead className="bg-muted/60">
              <tr>
                {[
                  "Last Active",
                  "First Visit",
                  "Visitor ID",
                  "Session ID",
                  "Country",
                  "Region",
                  "City",
                  "Device",
                  "Browser",
                  "Operating System",
                  "Referrer",
                  "Landing Page",
                  "Page Views",
                  "Pages Visited",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="whitespace-nowrap border-b border-border px-4 py-3 font-semibold"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {visitors.map((visitor) => (
                <tr
                  key={visitor.id}
                  className="border-b border-border last:border-0 hover:bg-muted/30"
                >
                  <td className="whitespace-nowrap px-4 py-3 font-medium">
                    {formatDateTime(visitor.last_seen_at)}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3">
                    {formatDateTime(visitor.first_seen_at)}
                  </td>

                  <td
                    className="max-w-36 truncate px-4 py-3 font-mono text-xs"
                    title={visitor.visitor_id}
                  >
                    {visitor.visitor_id}
                  </td>

                  <td
                    className="max-w-36 truncate px-4 py-3 font-mono text-xs"
                    title={visitor.id}
                  >
                    {visitor.id}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3">
                    {displayValue(visitor.country)}
                    {visitor.country_code
                      ? ` (${visitor.country_code})`
                      : ""}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3">
                    {displayValue(visitor.region)}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3">
                    {displayValue(visitor.city)}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3">
                    {displayValue(visitor.device_type)}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3">
                    {displayValue(visitor.browser)}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3">
                    {displayValue(visitor.operating_system)}
                  </td>

                  <td
                    className="max-w-48 truncate px-4 py-3"
                    title={visitor.referrer ?? ""}
                  >
                    {displayValue(visitor.referrer)}
                  </td>

                  <td
                    className="max-w-40 truncate px-4 py-3"
                    title={visitor.landing_page ?? ""}
                  >
                    {displayValue(visitor.landing_page)}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {visitor.page_views.length}
                  </td>

                  <td className="max-w-64 px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {visitor.page_views.length === 0 ? (
                        <span className="text-muted-foreground">—</span>
                      ) : (
                        visitor.page_views.map((view, index) => (
                          <span
                            key={`${view.viewed_at}-${index}`}
                            title={formatDateTime(view.viewed_at)}
                            className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary"
                          >
                            {view.page_path}
                          </span>
                        ))
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Scroll horizontally to view all columns. Visitor IDs are anonymous
        browser identifiers, not personal identities.
      </p>
    </section>
  );
}
