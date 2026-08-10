import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Simulated performance metrics
// In a real app, these would come from a monitoring service or a dedicated DB table
const MOCK_PERFORMANCE_DATA = {
  baseline: {
    lcp: 1.8,
    inp: 120,
    cls: 0.05,
    ttfb: 0.3,
  },
  slowRequests: [
    { route: "/api/location-search", duration: 1250, timestamp: new Date().toISOString() },
    { route: "/api/commercial-calculation", duration: 1800, timestamp: new Date(Date.now() - 3600000).toISOString() },
  ],
  bundleStats: {
    main: "145 KB",
    vendor: "420 KB",
    admin: "85 KB",
  }
};

export const getPerformanceMetrics = createServerFn({ method: "GET" })
  .handler(async () => {
    // Return performance snapshots
    return MOCK_PERFORMANCE_DATA;
  });

export const logSlowRequest = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({
    route: z.string(),
    duration: z.number(),
    status: z.number().optional(),
  }).parse(data))
  .handler(async ({ data }) => {
    console.warn(`[SLOW REQUEST] ${data.route} took ${data.duration}ms`);
    // In production, write to audit_logs or a specific performance table
    return { success: true };
  });
