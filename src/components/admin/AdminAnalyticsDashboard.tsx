
"use client";

import { useCallback, useEffect, useState } from "react";

import {
  Eye,
  Users,
  UserRound,
  MonitorSmartphone,
  Globe2,
  RefreshCw,
  TrendingUp,
  FileText,
  Chrome,
  ExternalLink,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";

// ---------------------------------------------
// Types matching the JSON returned by Supabase
// ---------------------------------------------

type TopPage = {
  page_path: string;
  views: number;
};

type CountryStat = {
  country: string;
  sessions: number;
};

type DeviceStat = {
  device: string;
  sessions: number;
};

type BrowserStat = {
  browser: string;
  sessions: number;
};

type ReferrerStat = {
  referrer: string;
  sessions: number;
};

type DailyStat = {
  date: string;
  page_views: number;
  sessions: number;
};

type AnalyticsData = {
  totalPageViews: number;
  totalSessions: number;
  uniqueVisitors: number;
  topPages: TopPage[];
  countries: CountryStat[];
  devices: DeviceStat[];
  browsers: BrowserStat[];
  referrers: ReferrerStat[];
  dailyStats: DailyStat[];
};

// ---------------------------------------------
// Reusable formatting helpers
// ---------------------------------------------

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value ?? 0);
}

function formatDate(value: string): string {
  return new Date(`${value}T00:00:00`).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
    }
  );
}

// ---------------------------------------------
// Main Dashboard Component
// ---------------------------------------------

export function AdminAnalyticsDashboard() {
  const [analytics, setAnalytics] =
    useState<AnalyticsData | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(
    null
  );

  // Fetch analytics from the protected API.
  const fetchAnalytics = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/admin/analytics",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (response.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to load analytics."
        );
      }

      setAnalytics(result.data as AnalyticsData);
      setLastUpdated(new Date());

    } catch (err) {
      console.error("Dashboard analytics error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading analytics."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch data when the component first loads.
  useEffect(() => {
    void fetchAnalytics();
  }, [fetchAnalytics]);

  // Calculate average page views per session.
  const averageViews =
    analytics && analytics.totalSessions > 0
      ? (
          analytics.totalPageViews /
          analytics.totalSessions
        ).toFixed(2)
      : "0.00";

  return (
    <div className="space-y-8">

      {/* --------------------------------------- */}
      {/* Dashboard Toolbar                       */}
      {/* --------------------------------------- */}

      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold">
            Overview
          </h2>

          <p className="text-sm text-muted-foreground">
            Analytics for the last 30 days
          </p>
        </div>

        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="text-xs text-muted-foreground">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={fetchAnalytics}
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

      {/* --------------------------------------- */}
      {/* Error Message                           */}
      {/* --------------------------------------- */}

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 text-destructive" />

          <div>
            <p className="font-medium text-destructive">
              Unable to load analytics
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {error}
            </p>

            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={fetchAnalytics}
            >
              Try again
            </Button>
          </div>
        </div>
      )}

      {/* --------------------------------------- */}
      {/* Summary Cards                           */}
      {/* --------------------------------------- */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <SummaryCard
          title="Total Page Views"
          value={
            analytics
              ? formatNumber(analytics.totalPageViews)
              : "—"
          }
          description="Pages viewed in the last 30 days"
          icon={<Eye className="h-5 w-5" />}
          isLoading={isLoading}
        />

        <SummaryCard
          title="Total Sessions"
          value={
            analytics
              ? formatNumber(analytics.totalSessions)
              : "—"
          }
          description="Visitor sessions in the last 30 days"
          icon={<Users className="h-5 w-5" />}
          isLoading={isLoading}
        />

        <SummaryCard
          title="Unique Visitors"
          value={
            analytics
              ? formatNumber(analytics.uniqueVisitors)
              : "—"
          }
          description="Distinct anonymous visitors"
          icon={<UserRound className="h-5 w-5" />}
          isLoading={isLoading}
        />

        <SummaryCard
          title="Average Views / Session"
          value={analytics ? averageViews : "—"}
          description="Average pages viewed per session"
          icon={<TrendingUp className="h-5 w-5" />}
          isLoading={isLoading}
        />

      </div>

      {/* --------------------------------------- */}
      {/* Daily Traffic Chart                     */}
      {/* --------------------------------------- */}

      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            Traffic Overview
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Daily page views and visitor sessions
          </p>
        </div>

        {isLoading ? (
          <LoadingPlaceholder height="h-64" />
        ) : analytics?.dailyStats?.length ? (
          <TrafficChart data={analytics.dailyStats} />
        ) : (
          <EmptyState message="No traffic data available yet." />
        )}
      </section>

      {/* --------------------------------------- */}
      {/* Page Views and Locations                */}
      {/* --------------------------------------- */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <AnalyticsList
          title="Top Pages"
          description="Most visited pages"
          icon={<FileText className="h-5 w-5" />}
          isLoading={isLoading}
          emptyMessage="No page views recorded yet."
          items={analytics?.topPages.map((item) => ({
            label: item.page_path,
            value: item.views,
          })) ?? []}
        />

        <AnalyticsList
          title="Visitor Countries"
          description="Sessions by country"
          icon={<Globe2 className="h-5 w-5" />}
          isLoading={isLoading}
          emptyMessage="No country information available."
          items={analytics?.countries.map((item) => ({
            label: item.country,
            value: item.sessions,
          })) ?? []}
        />

      </div>

      {/* --------------------------------------- */}
      {/* Devices and Browsers                    */}
      {/* --------------------------------------- */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <AnalyticsList
          title="Devices"
          description="Visitor sessions by device"
          icon={<MonitorSmartphone className="h-5 w-5" />}
          isLoading={isLoading}
          emptyMessage="No device information available."
          items={analytics?.devices.map((item) => ({
            label: item.device,
            value: item.sessions,
          })) ?? []}
        />

        <AnalyticsList
          title="Browsers"
          description="Visitor sessions by browser"
          icon={<Chrome className="h-5 w-5" />}
          isLoading={isLoading}
          emptyMessage="No browser information available."
          items={analytics?.browsers.map((item) => ({
            label: item.browser,
            value: item.sessions,
          })) ?? []}
        />

      </div>

      {/* --------------------------------------- */}
      {/* Referral Sources                        */}
      {/* --------------------------------------- */}

      <AnalyticsList
        title="Traffic Sources"
        description="Where your visitors came from"
        icon={<ExternalLink className="h-5 w-5" />}
        isLoading={isLoading}
        emptyMessage="No referral information available."
        items={analytics?.referrers.map((item) => ({
          label: item.referrer,
          value: item.sessions,
        })) ?? []}
      />

    </div>
  );
}

// ---------------------------------------------
// Summary Card Component
// ---------------------------------------------

function SummaryCard({
  title,
  value,
  description,
  icon,
  isLoading,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  isLoading: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">
          {title}
        </p>

        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          {icon}
        </div>
      </div>

      {isLoading ? (
        <div className="mt-4 h-9 w-24 animate-pulse rounded bg-muted" />
      ) : (
        <p className="mt-4 text-3xl font-bold tracking-tight">
          {value}
        </p>
      )}

      <p className="mt-2 text-xs text-muted-foreground">
        {description}
      </p>

    </div>
  );
}

// ---------------------------------------------
// Daily Traffic Chart
// ---------------------------------------------

function TrafficChart({
  data,
}: {
  data: DailyStat[];
}) {
  const maxValue = Math.max(
    1,
    ...data.map((item) =>
      Math.max(item.page_views, item.sessions)
    )
  );

  const chartWidth = 900;
  const chartHeight = 220;
  const chartPadding = 12;

  const getPoints = (key: "page_views" | "sessions") => {
    return data
      .map((item, index) => {
        const x =
          chartPadding +
          (index / Math.max(data.length - 1, 1)) *
            (chartWidth - chartPadding * 2);

        const y =
          chartHeight -
          chartPadding -
          (item[key] / maxValue) *
            (chartHeight - chartPadding * 2);

        return `${x},${y}`;
      })
      .join(" ");
  };

  const labelIndexes = [
    0,
    Math.floor((data.length - 1) / 2),
    data.length - 1,
  ];

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-5 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          Page Views
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
          Sessions
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="h-auto w-full overflow-visible"
          role="img"
          aria-label="Daily page views and visitor sessions over the last 30 days"
        >
          {/* Horizontal guide lines */}
          {[0, 1, 2, 3, 4].map((line) => {
            const y =
              (line / 4) * (chartHeight - chartPadding * 2) +
              chartPadding;

            return (
              <line
                key={line}
                x1="0"
                y1={y}
                x2={chartWidth}
                y2={y}
                stroke="currentColor"
                opacity="0.10"
                strokeDasharray="4 5"
              />
            );
          })}

          {/* Page views line */}
          <polyline
            points={getPoints("page_views")}
            fill="none"
            stroke="#ff6500"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Sessions line */}
          <polyline
            points={getPoints("sessions")}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

        </svg>
      </div>

      <div className="mt-3 flex justify-between text-xs text-muted-foreground">
        {labelIndexes.map((index) => (
          <span key={index}>
            {formatDate(data[index].date)}
          </span>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5">
        <div>
          <p className="text-xs text-muted-foreground">
            Total Page Views
          </p>

          <p className="mt-1 text-xl font-semibold">
            {formatNumber(
              data.reduce(
                (total, item) => total + item.page_views,
                0
              )
            )}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">
            Total Sessions
          </p>

          <p className="mt-1 text-xl font-semibold">
            {formatNumber(
              data.reduce(
                (total, item) => total + item.sessions,
                0
              )
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------
// Reusable Analytics List Component
// ---------------------------------------------

function AnalyticsList({
  title,
  description,
  icon,
  items,
  isLoading,
  emptyMessage,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  items: { label: string; value: number }[];
  isLoading: boolean;
  emptyMessage: string;
}) {
  const maxValue = Math.max(
    1,
    ...items.map((item) => item.value)
  );

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">

      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          {icon}
        </div>

        <div>
          <h2 className="font-semibold">{title}</h2>

          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      {isLoading ? (
        <LoadingPlaceholder height="h-40" />
      ) : items.length === 0 ? (
        <EmptyState message={emptyMessage} />
      ) : (
        <div className="space-y-5">
          {items.map((item, index) => (
            <div key={`${item.label}-${index}`}>

              <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                <span className="min-w-0 truncate font-medium">
                  {item.label}
                </span>

                <span className="shrink-0 text-muted-foreground">
                  {formatNumber(item.value)}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                  }}
                />
              </div>

            </div>
          ))}
        </div>
      )}

    </section>
  );
}

// ---------------------------------------------
// Loading and Empty States
// ---------------------------------------------

function LoadingPlaceholder({
  height,
}: {
  height: string;
}) {
  return (
    <div
      className={`${height} w-full animate-pulse rounded-xl bg-muted`}
    />
  );
}

function EmptyState({
  message,
}: {
  message: string;
}) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-border px-4 text-center">
      <p className="text-sm text-muted-foreground">
        {message}
      </p>
    </div>
  );
}
