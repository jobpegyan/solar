import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { calculateRoofArea as calculateRoofAreaInternal, RoofAreaInput } from "./roof";

export const calculateRoofRequirement = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({
    panelCount: z.number().min(1),
    panelWidthIn: z.number().optional().nullable(),
    panelHeightIn: z.number().optional().nullable(),
    spacingFactor: z.number().optional().nullable(),
    availableRoofAreaSqFt: z.number().optional().nullable(),
    unit: z.enum(['sqft', 'sqm']).default('sqft'),
    orientation: z.enum(['portrait', 'landscape']).optional().nullable(),
    rowSpacingIn: z.number().optional().nullable(),
    columnSpacingIn: z.number().optional().nullable(),
  }).parse(data))
  .handler(async ({ data }) => {
    const input: RoofAreaInput = {
      panelCount: data.panelCount,
      panelWidthIn: data.panelWidthIn,
      panelHeightIn: data.panelHeightIn,
      spacingFactor: data.spacingFactor,
      availableRoofAreaSqFt: data.availableRoofAreaSqFt,
      unit: data.unit,
      orientation: data.orientation,
      rowSpacingIn: data.rowSpacingIn,
      columnSpacingIn: data.columnSpacingIn
    };
    return calculateRoofAreaInternal(input);
  });
