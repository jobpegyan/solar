import { supabase } from "@/integrations/supabase/client";
import { solarConfig } from "../solar-config";

export interface RoofAreaInput {
  panelCount: number;
  panelWidthIn?: number | null | undefined;
  panelHeightIn?: number | null | undefined;
  panelWattage?: number | null | undefined;
  spacingFactor?: number | null | undefined;
  availableRoofAreaSqFt?: number | null | undefined;
  unit: 'sqft' | 'sqm';
  orientation?: 'portrait' | 'landscape' | null | undefined;
  rowSpacingIn?: number | null | undefined;
  columnSpacingIn?: number | null | undefined;
}

export interface RoofAreaResults {
  panelOnlyAreaSqFt: number;
  panelOnlyAreaSqM: number;
  estimatedTotalAreaSqFt: number;
  estimatedTotalAreaSqM: number;
  arrayWidthFt: number;
  arrayHeightFt: number;
  isSpaceSufficient: boolean | null;
  areaDifferenceSqFt: number | null;
  panelDimensions: {
    widthIn: number;
    heightIn: number;
  };
}

export function calculateRoofArea(input: RoofAreaInput): RoofAreaResults {
  const {
    panelCount,
    panelWidthIn = 40,
    panelHeightIn = 79,
    spacingFactor = 1.25,
    availableRoofAreaSqFt,
    unit,
    orientation = 'portrait',
    rowSpacingIn = 1,
    columnSpacingIn = 1
  } = input;

  const resolvedPanelWidth = panelWidthIn ?? 40;
  const resolvedPanelHeight = panelHeightIn ?? 79;
  const resolvedSpacingFactor = spacingFactor ?? 1.25;
  const resolvedOrientation = orientation ?? 'portrait';
  const resolvedRowSpacing = rowSpacingIn ?? 1;
  const resolvedColSpacing = columnSpacingIn ?? 1;

  const w = resolvedOrientation === 'portrait' ? resolvedPanelWidth : resolvedPanelHeight;
  const h = resolvedOrientation === 'portrait' ? resolvedPanelHeight : resolvedPanelWidth;

  const singlePanelAreaSqIn = w * h;
  const totalPanelAreaSqIn = singlePanelAreaSqIn * panelCount;
  
  const panelOnlyAreaSqFt = totalPanelAreaSqIn / 144;
  const panelOnlyAreaSqM = panelOnlyAreaSqFt * 0.092903;

  const estimatedTotalAreaSqFt = panelOnlyAreaSqFt * resolvedSpacingFactor;
  const estimatedTotalAreaSqM = estimatedTotalAreaSqFt * 0.092903;

  const cols = Math.ceil(Math.sqrt(panelCount));
  const rows = Math.ceil(panelCount / cols);

  const arrayWidthIn = (cols * w) + ((cols - 1) * resolvedColSpacing);
  const arrayHeightIn = (rows * h) + ((rows - 1) * resolvedRowSpacing);

  const arrayWidthFt = arrayWidthIn / 12;
  const arrayHeightFt = arrayHeightIn / 12;

  let isSpaceSufficient = null;
  let areaDifferenceSqFt = null;

  if (availableRoofAreaSqFt !== undefined && availableRoofAreaSqFt !== null && availableRoofAreaSqFt > 0) {
    isSpaceSufficient = availableRoofAreaSqFt >= estimatedTotalAreaSqFt;
    areaDifferenceSqFt = availableRoofAreaSqFt - estimatedTotalAreaSqFt;
  }

  return {
    panelOnlyAreaSqFt: Number(panelOnlyAreaSqFt.toFixed(2)),
    panelOnlyAreaSqM: Number(panelOnlyAreaSqM.toFixed(2)),
    estimatedTotalAreaSqFt: Number(estimatedTotalAreaSqFt.toFixed(2)),
    estimatedTotalAreaSqM: Number(estimatedTotalAreaSqM.toFixed(2)),
    arrayWidthFt: Number(arrayWidthFt.toFixed(2)),
    arrayHeightFt: Number(arrayHeightFt.toFixed(2)),
    isSpaceSufficient,
    areaDifferenceSqFt: areaDifferenceSqFt !== null ? Number(areaDifferenceSqFt.toFixed(2)) : null,
    panelDimensions: {
      widthIn: w,
      heightIn: h
    }
  };
}
