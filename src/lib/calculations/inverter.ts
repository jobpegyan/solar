/**
 * Solar Inverter Calculation Engine
 */

export interface InverterLoadItem {
  name: string;
  quantity: number;
  runningWatts: number;
  surgeWatts?: number | undefined;
  hoursPerDay?: number | undefined;
}

export interface InverterSizeInputs {
  solarArraySizeKW?: number | undefined;
  targetDcAcRatio?: number | undefined;
  runningLoadW?: number | undefined;
  peakLoadW?: number | undefined;
  safetyMargin?: number | undefined; // 0-100
  inverterEfficiency?: number | undefined; // 0-100
  inverterType?: 'grid-tied' | 'off-grid' | 'hybrid' | undefined;
}

export interface InverterSizeResults {
  estimatedCapacityKW: number;
  recommendedRangeKW: [number, number];
  dcAcRatio: number;
  runningLoadKW: number;
  peakLoadKW: number;
  surgeRequirementKW: number;
  safetyMarginAmountKW: number;
}

export interface LoadResults {
  totalRunningWatts: number;
  estimatedPeakWatts: number;
  suggestedInverterSurgeWatts: number;
  applianceCount: number;
}

/**
 * Calculates inverter capacity required based on solar array and/or load.
 */
export function calculateInverterSize(inputs: InverterSizeInputs): InverterSizeResults {
  const {
    solarArraySizeKW = 0,
    targetDcAcRatio = 1.2,
    runningLoadW = 0,
    peakLoadW = 0,
    safetyMargin = 10,
    inverterEfficiency = 95,
  } = inputs;

  const margin = safetyMargin / 100;
  
  // 1. Array Based Sizing
  // Inverter AC = DC / Ratio
  const arrayBasedSize = solarArraySizeKW > 0 ? solarArraySizeKW / targetDcAcRatio : 0;

  // 2. Load Based Sizing
  // We prioritize peakLoad if provided, otherwise runningLoad
  const baseLoad = peakLoadW > 0 ? peakLoadW : runningLoadW;
  const loadBasedSize = (baseLoad / 1000) * (1 + margin);

  // 3. Combined / Final Decision
  // Usually the larger of the two requirements
  let estimatedCapacityKW = Math.max(arrayBasedSize, loadBasedSize);
  
  // Safety check for efficiency if load based
  if (loadBasedSize > 0) {
    // If we need 5kW AC to drive loads, and inverter is 90% efficient internally? 
    // Actually inverter capacity IS the AC output capacity. 
    // Efficiency affects DC input required, not the nameplate AC rating we are sizing here.
  }

  const dcAcRatio = estimatedCapacityKW > 0 ? solarArraySizeKW / estimatedCapacityKW : 0;
  
  return {
    estimatedCapacityKW: Number(estimatedCapacityKW.toFixed(2)),
    recommendedRangeKW: [
      Number((estimatedCapacityKW * 0.9).toFixed(1)),
      Number((estimatedCapacityKW * 1.1).toFixed(1))
    ],
    dcAcRatio: Number(dcAcRatio.toFixed(2)),
    runningLoadKW: Number((runningLoadW / 1000).toFixed(2)),
    peakLoadKW: Number((peakLoadW / 1000).toFixed(2)),
    surgeRequirementKW: Number((peakLoadW / 1000).toFixed(2)), // For now same as peak
    safetyMarginAmountKW: Number(((baseLoad / 1000) * margin).toFixed(2))
  };
}

/**
 * Calculates total running and peak load from a list of appliances.
 */
export function calculateInverterLoad(items: InverterLoadItem[]): LoadResults {
  let totalRunning = 0;
  let maxSurgeDiff = 0;
  let totalSurge = 0;

  items.forEach(item => {
    const running = item.runningWatts * item.quantity;
    const surge = (item.surgeWatts || item.runningWatts) * item.quantity;
    
    totalRunning += running;
    totalSurge += surge;
    
    const diff = surge - running;
    if (diff > maxSurgeDiff) {
      maxSurgeDiff = diff;
    }
  });

  // Simple heuristic: Total running load + the largest single surge difference
  // This assumes not all motors start at the exact same millisecond.
  const estimatedPeak = totalRunning + maxSurgeDiff;

  return {
    totalRunningWatts: totalRunning,
    estimatedPeakWatts: estimatedPeak,
    suggestedInverterSurgeWatts: totalSurge, // Worst case safety
    applianceCount: items.length
  };
}
