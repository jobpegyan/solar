import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const saveCalculationSchema = z.object({
  calculatorId: z.string(),
  calculatorSlug: z.string(),
  name: z.string().max(100),
  inputs: z.record(z.string(), z.any()),
  results: z.record(z.string(), z.any()),
  country: z.string().optional().nullable(),
  locationContext: z.record(z.string(), z.any()).optional().nullable(),
  currency: z.string().optional().nullable(),
  units: z.string().optional().nullable(),
  formulaVersion: z.string(),
});

export const saveCalculation = createServerFn({ method: "POST" })
  .validator((data: unknown) => saveCalculationSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const mockUserId = "00000000-0000-0000-0000-000000000000";

    const { data: saved, error } = await supabaseAdmin
      .from("saved_calculations")
      .insert([{
        user_id: mockUserId, 
        calculator_id: data.calculatorId,
        calculator_slug: data.calculatorSlug,
        name: data.name,
        inputs: data.inputs,
        results: data.results,
        country: data.country,
        location_context: data.locationContext,
        currency: data.currency,
        units: data.units,
        formula_version: data.formulaVersion,
      }])
      .select()
      .single();

    if (error) throw error;
    return saved;
  });

export const getSavedCalculations = createServerFn({ method: "GET" })
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("saved_calculations")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) throw error;
    return data;
  });

export const getSavedCalculation = createServerFn({ method: "GET" })
  .validator((id: string) => z.string().parse(id))
  .handler(async ({ data: id }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("saved_calculations")
      .select("*")
      .or(`id.eq.${id},share_token.eq.${id}`)
      .single();
    
    if (error) throw error;
    return data;
  });

export const deleteSavedCalculation = createServerFn({ method: "POST" })
  .validator((id: string) => z.string().parse(id))
  .handler(async ({ data: id }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("saved_calculations")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return { success: true };
  });

export const toggleCalculationPublic = createServerFn({ method: "POST" })
  .validator((data: { id: string; isPublic: boolean }) => z.object({
    id: z.string(),
    isPublic: z.boolean()
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: updated, error } = await supabaseAdmin
      .from("saved_calculations")
      .update({ is_public: data.isPublic })
      .eq("id", data.id)
      .select()
      .single();

    if (error) throw error;
    return updated;
  });
