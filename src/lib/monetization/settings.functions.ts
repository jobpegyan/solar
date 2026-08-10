// src/lib/monetization/settings.functions.ts
import { createServerFn } from "@tanstack/react-start";
import type { MonetizationSettings } from "./types";

const FALLBACK_SETTINGS: MonetizationSettings = {
  id: "00000000-0000-0000-0000-000000000001",
  ads_enabled: false,
  adsense_publisher_id: null,
  auto_ads_enabled: false,
  calculator_ads_enabled: false,
  guide_ads_enabled: false,
  category_ads_enabled: false,
  homepage_ads_enabled: false,
  max_ads_per_page: 3,
  ad_placements: {},
  affiliate_links_enabled: false,
  affiliate_disclosure: null,
  updated_at: new Date(0).toISOString(),
};

export const getMonetizationSettings = createServerFn({ method: "GET" }).handler(
  async (): Promise<MonetizationSettings> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

      const { data, error } = await supabaseAdmin
        .from("monetization_settings")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (error || !data) return FALLBACK_SETTINGS;
      return data as unknown as MonetizationSettings;
    } catch {
      // Table not provisioned yet or backend unavailable — ads stay disabled.
      return FALLBACK_SETTINGS;
    }
  },
);

export const updateMonetizationSettings = createServerFn({ method: "POST" })
  .inputValidator((data: Partial<MonetizationSettings>) => data)
  .handler(async ({ data }): Promise<MonetizationSettings> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: updated, error } = await supabaseAdmin
      .from("monetization_settings")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", FALLBACK_SETTINGS.id)
      .select()
      .maybeSingle();

    if (error || !updated) {
      throw new Error(error?.message ?? "Failed to update monetization settings");
    }

    return updated as unknown as MonetizationSettings;
  });
