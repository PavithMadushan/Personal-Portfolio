
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Get a stable anonymous visitor ID from localStorage.
// This ID remains the same across visits in the same browser.
function getVisitorId(): string {
  let visitorId = localStorage.getItem("analytics_visitor_id");

  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem("analytics_visitor_id", visitorId);
  }

  return visitorId;
}

// Get a session ID from sessionStorage.
// A new browser tab/session gets its own session ID.
function getSessionId(): string {
  let sessionId = sessionStorage.getItem("analytics_session_id");

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem("analytics_session_id", sessionId);
  }

  return sessionId;
}

// Basic browser and operating-system detection.
// This is approximate because browsers can limit user-agent details.
function getBrowserInfo() {
  const userAgent = navigator.userAgent;

  let browser = "Other";
  if (userAgent.includes("Edg/")) browser = "Edge";
  else if (userAgent.includes("OPR/")) browser = "Opera";
  else if (userAgent.includes("Chrome/")) browser = "Chrome";
  else if (userAgent.includes("Firefox/")) browser = "Firefox";
  else if (userAgent.includes("Safari/")) browser = "Safari";

  let operatingSystem = "Other";
  if (userAgent.includes("Windows")) operatingSystem = "Windows";
  else if (userAgent.includes("Mac OS")) operatingSystem = "macOS";
  else if (userAgent.includes("Android")) operatingSystem = "Android";
  else if (/iPhone|iPad|iPod/.test(userAgent)) operatingSystem = "iOS";
  else if (userAgent.includes("Linux")) operatingSystem = "Linux";

  let deviceType = "Desktop";
  if (/iPhone|Android.*Mobile|Windows Phone/i.test(userAgent)) {
    deviceType = "Mobile";
  } else if (/iPad|Tablet|Android(?!.*Mobile)/i.test(userAgent)) {
    deviceType = "Tablet";
  }

  return { browser, operatingSystem, deviceType };
}

export function AnalyticsTracker() {
  const pathname = usePathname();

  // Prevent duplicate tracking of the same path during React
  // development Strict Mode's repeated effect execution.
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Do not track the analytics dashboard or its API.
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
      return;
    }

    // Avoid duplicate calls for the same path in this component instance.
    if (lastTrackedPath.current === pathname) {
      return;
    }

    lastTrackedPath.current = pathname;

    const trackPageView = async () => {
      try {
        const visitorId = getVisitorId();
        const sessionId = getSessionId();
        const { browser, operatingSystem, deviceType } = getBrowserInfo();

        await fetch("/api/analytics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            visitorId,
            sessionId,
            pagePath: pathname,
            referrer: document.referrer,
            browser,
            operatingSystem,
            deviceType,
          }),
          keepalive: true,
        });
      } catch (error) {
        // Analytics should never interrupt the visitor's experience.
        console.error("Unable to send analytics:", error);
      }
    };

    void trackPageView();
  }, [pathname]);

  return null;
}
