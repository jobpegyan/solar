import { solarConfig } from "../solar-config";

export type InverterSystemType = 'on-grid' | 'off-grid' | 'hybrid';

export interface InverterInput {
  systemSizeKW: number;
  maxContinuousLoadKW: number;
  peakLoadKW: number;
  systemType: InverterSystemType;
  loadingRatio?: number;
  futureExpansion?: number;
}

export interface InverterResults {
  recommendedInverterSizeKW: number;
  solarArraySizeKW: number;
  maxLoadKW: number;
  peakLoadKW: number;
  suggestedSystemType: InverterSystemType;
  explanation: string;
}

export function calculateInverter(input: InverterInput): InverterResults {
  const ratio = input.loadingRatio || solarConfig.defaultInverterLoadingRatio;
  const expansion = input.futureExpansion !== undefined ? input.futureExpansion : solarConfig.defaultFutureExpansion;

  // Inverter should be sized based on either solar capacity (with ratio) or load requirements
  const sizeFromSolar = input.systemSizeKW / ratio;
  const sizeFromLoad = input.maxContinuousLoadKW * (1 + expansion);
  
  // For hybrid/off-grid, load is usually the priority
  const recommendedSize = Math.max(sizeFromSolar, sizeFromLoad);

  return {
    recommendedInverterSizeKW: Number(recommendedSize.toFixed(2)),
    solarArraySizeKW: input.systemSizeKW,
    maxLoadKW: input.maxContinuousLoadKW,
    peakLoadKW: input.peakLoadKW,
    suggestedSystemType: input.systemType,
    explanation: `Sized based on max of (Solar Array / Loading Ratio) or (Load Requirement + Expansion). Current choice: ${recommendedSize.toFixed(2)} kW.`
  };
}
