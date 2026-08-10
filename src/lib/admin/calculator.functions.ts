import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Categories
export const getAdminCategories = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabaseAdmin
      .from("calculator_categories")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  });

export const updateCategory = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({
    id: z.string().uuid(),
    updates: z.record(z.string(), z.any())
  }).parse(data))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin
      .from("calculator_categories")
      .update(data.updates)
      .eq("id", data.id);

    if (error) throw new Error(error.message);
    return { success: true };
  });

// Calculators
export const getAdminCalculators = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabaseAdmin
      .from("calculators")
      .select("*, calculator_categories(name)")
      .order("name", { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  });

export const getCalculatorDetails = createServerFn({ method: "GET" })
  .validator((data: unknown) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const [calc, content] = await Promise.all([
      supabaseAdmin.from("calculators").select("*, calculator_categories(*)").eq("id", data.id).single(),
      supabaseAdmin.from("calculator_content").select("*").eq("calculator_id", data.id)
    ]);

    if (calc.error) throw new Error(calc.error.message);
    
    return {
      ...calc.data,
      content: content.data || []
    };
  });

export const updateCalculator = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({
    id: z.string(),
    updates: z.record(z.string(), z.any())
  }).parse(data))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin
      .from("calculators")
      .update({ ...data.updates, updated_at: new Date().toISOString() })
      .eq("id", data.id);

    if (error) throw new Error(error.message);
    return { success: true };
  });

export const updateCalculatorContent = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({
    calculator_id: z.string(),
    country_code: z.string().nullable(),
    content: z.record(z.string(), z.any())
  }).parse(data))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin
      .from("calculator_content")
      .upsert({
        calculator_id: data.calculator_id,
        country_code: data.country_code,
        ...data.content,
        updated_at: new Date().toISOString()
      }, { onConflict: 'calculator_id, country_code' });

    if (error) throw new Error(error.message);
    return { success: true };
  });

// Redirects
export const getAdminRedirects = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabaseAdmin
      .from("redirects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  });

export const createRedirect = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({
    source_path: z.string(),
    destination_path: z.string(),
    status_code: z.number().default(301),
    active: z.boolean().default(true)
  }).parse(data))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin
      .from("redirects")
      .insert(data);

    if (error) throw new Error(error.message);
    return { success: true };
  });
