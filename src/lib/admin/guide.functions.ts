import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { Guide } from "@/lib/content/types";

const guideSchema = z.object({
  id: z.string().optional(),
  slug: z.string(),
  title: z.string(),
  h1: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  intro: z.string().optional(),
  content: z.string(),
  category: z.string(),
  status: z.string(),
  featured: z.boolean().optional(),
  calculator_links: z.array(z.string()).optional(),
  country: z.string().optional(),
  published_at: z.string().optional(),
  last_reviewed_at: z.string().optional(),
});

export const createOrUpdateGuide = createServerFn({ method: "POST" })
  .validator((data: unknown) => guideSchema.parse(data))
  .handler(async ({ data }) => {
    const { id, ...guideData } = data;
    
    let result;
    if (id) {
      result = await supabaseAdmin
        .from("guides")
        .update(guideData)
        .eq("id", id)
        .select()
        .single();
    } else {
      result = await supabaseAdmin
        .from("guides")
        .insert(guideData)
        .select()
        .single();
    }

    if (result.error) throw new Error(result.error.message);
    return result.data as Guide;
  });

export const deleteGuide = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin
      .from("guides")
      .delete()
      .eq("id", data.id);

    if (error) throw new Error(error.message);
    return { success: true };
  });

export const manageGuideSources = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({
    guideId: z.string(),
    sources: z.array(z.object({
      id: z.string().optional(),
      name: z.string(),
      url: z.string().optional(),
      source_type: z.string().optional(),
      publication_date: z.string().optional(),
    }))
  }).parse(data))
  .handler(async ({ data }) => {
    await supabaseAdmin.from("guide_sources").delete().eq("guide_id", data.guideId);
    
    const sourcesToInsert = data.sources.map((s: any) => ({
      guide_id: data.guideId,
      name: s.name,
      url: s.url,
      source_type: s.source_type,
      publication_date: s.publication_date
    }));

    const { error } = await supabaseAdmin
      .from("guide_sources")
      .insert(sourcesToInsert);

    if (error) throw new Error(error.message);
    return { success: true };
  });

export const manageGuideFAQs = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({
    guideId: z.string(),
    faqs: z.array(z.object({
      id: z.string().optional(),
      question: z.string(),
      answer: z.string(),
      display_order: z.number().optional(),
    }))
  }).parse(data))
  .handler(async ({ data }) => {
    await supabaseAdmin.from("guide_faqs").delete().eq("guide_id", data.guideId);
    
    const faqsToInsert = data.faqs.map((f: any, index: number) => ({
      guide_id: data.guideId,
      question: f.question,
      answer: f.answer,
      display_order: f.display_order ?? index
    }));

    const { error } = await supabaseAdmin
      .from("guide_faqs")
      .insert(faqsToInsert);

    if (error) throw new Error(error.message);
    return { success: true };
  });
