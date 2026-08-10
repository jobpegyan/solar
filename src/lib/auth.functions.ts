import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const checkAdminRole = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ userId: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const { data: roleData, error } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", data.userId)
      .eq("role", "admin")
      .single();

    if (error || !roleData) {
      return { isAdmin: false };
    }

    return { isAdmin: true };
  });
