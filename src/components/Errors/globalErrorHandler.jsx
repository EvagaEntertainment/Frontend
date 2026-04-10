'use client';
import axios from "axios";

const logErrorToServer = (logData) => {
  const enhancedLogData = {
    ...logData,
    timestamp: new Date().toISOString(),
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "SSR",
    platform: typeof navigator !== "undefined" ? navigator.platform : "SSR",
    language: typeof navigator !== "undefined" ? navigator.language : "en",
    url: typeof window !== "undefined" ? window.location.href : "SSR",
  };

  axios
    .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}logerror/log-error`, enhancedLogData)
    .catch((err) => {
      console.error("Error logging failed:", err);
    });
};

const isGoogleAnalyticsError = (url) => {
  return (
    typeof url === "string" && url.includes("https://www.google-analytics.com")
  );
};

if (typeof window !== "undefined") {
  window.onerror = function (message, source, lineno, colno, error) {
    if (isGoogleAnalyticsError(source)) {
      return; // Skip logging for Google Analytics errors
    }

    logErrorToServer({
      type: "Global Error",
      message,
      source,
      lineno,
      colno,
      error: error ? error.toString() : null,
      stackTrace: error ? error.stack : null,
    });
  };

  window.addEventListener("unhandledrejection", (event) => {
    const url = event.reason?.config?.url || event.reason?.request?.responseURL;

    if (isGoogleAnalyticsError(url)) {
      return; 
    }

    logErrorToServer({
      type: "Unhandled Rejection",
      message: event.reason ? event.reason.toString() : "Unhandled rejection",
      stackTrace: event.reason ? event.reason.stack : null,
    });
  });


  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const url = args[0];

    // Skip logging for Google Analytics URLs
    if (isGoogleAnalyticsError(url)) {
      return originalFetch(...args); // Skip logging and proceed with the original fetch
    }

    try {
      const response = await originalFetch(...args);
      if (!response.ok) {
        logErrorToServer({
          type: "Network Error",
          message: `Fetch failed with status: ${response.status}`,
          url: args[0],
          status: response.status,
          statusText: response.statusText,
        });
      }
      return response;
    } catch (error) {
      logErrorToServer({
        type: "Network Error",
        message: error.toString(),
        url: args[0],
        stackTrace: error.stack,
      });
      throw error; // Re-throw to avoid altering behavior
    }
  };
}

