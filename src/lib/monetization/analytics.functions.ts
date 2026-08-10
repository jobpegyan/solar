import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Tracks conversion events for monetization and performance analysis.
 * In a real app, this would log to Supabase analytics table.
 */
export const trackConversion = createServerFn({ method: "POST" })
  .validator(z.object({
    eventName: z.enum([
      'calculator_completed',
      'calculator_saved',
      'calculator_shared',
      'guide_calculator_click',
      'cta_clicked',
      'ad_view',
      'ad_click'
    ]),
    calculatorId: z.string().optional(),
    guideSlug: z.string().optional(),
    placement: z.string().optional(),
    metadata: z.record(z.string(), z.any()).optional()
  }))
  .handler(async ({ data }) => {
    // Analytics logging would happen here
    console.log(`[Analytics] Conversion event tracked: ${data.eventName}`, data);
    return { success: true };
  });
