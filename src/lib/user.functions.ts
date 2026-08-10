import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Definitions to ensure serializable types for TanStack Start
const SerializableRecord = z.record(z.string(), z.any());

export const getProfile = createServerFn({ method: "GET" })
  .handler(async () => {
    return {
      id: "mock-user-id",
      full_name: "Solar Enthusiast" as string,
      email: "user@example.com",
      country: "USA" as string,
      region: "California" as string,
      city: "Los Angeles",
      postal_code: "90001",
      preferred_currency: "USD" as string,
      preferred_unit_system: "imperial" as string,
      marketing_consent: true as boolean,
    };
  });

export const updateProfile = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({
    full_name: z.string().optional(),
    country: z.string().optional(),
    region: z.string().optional(),
    city: z.string().optional(),
    postal_code: z.string().optional(),
    preferred_currency: z.string().optional(),
    preferred_unit_system: z.string().optional(),
    marketing_consent: z.boolean().optional(),
  }).parse(data))
  .handler(async ({ data }) => {
    return { success: true };
  });

export const getSavedCalculations = createServerFn({ method: "GET" })
  .handler(async () => {
    return [
      {
        id: "calc-1",
        name: "California Home Solar Estimate",
        calculator_type: "solar-panel",
        system_size_kw: 8.8,
        updated_at: new Date().toISOString(),
        is_favorite: true,
        calculation_version: "1.0",
      },
      {
        id: "calc-2",
        name: "Texas Off-Grid Plan",
        calculator_type: "off-grid",
        system_size_kw: 12.5,
        updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
        is_favorite: false,
        calculation_version: "1.0",
      }
    ];
  });

export const getCalculationById = createServerFn({ method: "GET" })
  .validator((data: unknown) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const id = data.id;
    return {
      id,
      name: "California Home Solar Estimate",
      calculator_type: "solar-panel",
      system_size_kw: 8.8,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_favorite: true,
      calculation_version: "1.0",
    };
  });

export const saveCalculation = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({
    name: z.string(),
    calculator_type: z.string(),
    input_data: SerializableRecord,
    result_data: SerializableRecord,
    location_data: SerializableRecord.optional(),
  }).parse(data))
  .handler(async ({ data }) => {
    return { id: "new-calc-id" };
  });

export const deleteCalculation = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    return { success: true };
  });

export const toggleFavorite = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ id: z.string(), is_favorite: z.boolean() }).parse(data))
  .handler(async ({ data }) => {
    return { success: true };
  });

export const createShareLink = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ calculation_id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    return { public_id: "shared-" + Math.random().toString(36).substring(7) };
  });

export const deleteAccount = createServerFn({ method: "POST" })
  .handler(async () => {
    return { success: true };
  });