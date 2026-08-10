import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Guide } from "./types";

export const getGuides = createServerFn({ method: "GET" })
  .validator((data: unknown) => z.object({
    category: z.string().optional(),
    status: z.string().optional(),
    featured: z.boolean().optional(),
    country: z.string().optional(),
    limit: z.number().optional().default(10),
    offset: z.number().optional().default(0)
  }).parse(data))
  .handler(async ({ data }) => {
    let query = supabase
      .from("guides")
      .select(`
        *,
        faqs:guide_faqs(*),
        sources:guide_sources(*)
      `)
      .order("published_at", { ascending: false });

    if (data.category) query = query.eq("category", data.category);
    if (data.status) query = query.eq("status", data.status);
    if (data.featured !== undefined) query = query.eq("featured", data.featured);
    if (data.country) query = query.eq("country", data.country);
    
    query = query.range(data.offset, data.offset + data.limit - 1);

    const { data: guides, error } = await query;
    if (error) throw new Error(error.message);

    return guides as Guide[];
  });

export const getGuideBySlug = createServerFn({ method: "GET" })
  .validator((data: unknown) => z.object({ slug: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const { data: guide, error } = await supabase
      .from("guides")
      .select(`
        *,
        faqs:guide_faqs(*),
        sources:guide_sources(*)
      `)
      .eq("slug", data.slug)
      .single();

    if (error) throw new Error(error.message);
    return guide as Guide;
  });

export const getRelatedGuides = createServerFn({ method: "GET" })
  .validator((data: unknown) => z.object({ 
    category: z.string(), 
    excludeId: z.string(), 
    limit: z.number().optional().default(3) 
  }).parse(data))
  .handler(async ({ data }) => {
    const { data: guides, error } = await supabase
      .from("guides")
      .select("*")
      .eq("category", data.category)
      .neq("id", data.excludeId)
      .eq("status", "published")
      .limit(data.limit);

    if (error) throw new Error(error.message);
    return guides as Guide[];
  });
