import { describe, it, expect } from 'vitest';
import { calculateInverterSize, calculateInverterLoad } from '@/lib/calculations/inverter';

describe('Inverter Sizing Logic', () => {
  describe('calculateInverterLoad', () => {
    it('calculates load correctly', () => {
      const appliances = [
        { name: 'TV', quantity: 1, runningWatts: 100, surgeWatts: 100 },
        { name: 'Fridge', quantity: 1, runningWatts: 200, surgeWatts: 600 },
      ];
      const result = calculateInverterLoad(appliances);
      expect(result.totalRunningWatts).toBe(300);
      expect(result.estimatedPeakWatts).toBe(700);
    });
  });

  describe('calculateInverterSize', () => {
    it('sizes based on array capacity', () => {
      // Inputs use optional fields as per src/lib/calculations/inverter.ts
      const result = calculateInverterSize({ 
        solarArraySizeKW: 5, 
        targetDcAcRatio: 1.25,
        runningLoadW: 0,
        peakLoadW: 0,
        safetyMargin: 0
      });
      // 5 / 1.25 = 4
      expect(result.estimatedCapacityKW).toBe(4);
    });

    it('sizes based on peak load', () => {
      const result = calculateInverterSize({
        peakLoadW: 1000,
        safetyMargin: 25, // 25%
        solarArraySizeKW: 0
      });
      // 1000 * 1.25 = 1.25 kW
      expect(result.estimatedCapacityKW).toBe(1.25);
    });
  });
});
