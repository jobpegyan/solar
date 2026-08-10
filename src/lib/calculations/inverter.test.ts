import { describe, it, expect } from 'vitest';
import { calculateInverterSize, calculateInverterLoad } from './inverter';

describe('Inverter Logic', () => {
  describe('calculateInverterSize', () => {
    it('calculates array-based size correctly', () => {
      const results = calculateInverterSize({
        solarArraySizeKW: 6,
        targetDcAcRatio: 1.2,
        safetyMargin: 0
      });
      // 6 / 1.2 = 5
      expect(results.estimatedCapacityKW).toBe(5);
      expect(results.dcAcRatio).toBe(1.2);
    });

    it('calculates load-based size correctly', () => {
      const results = calculateInverterSize({
        runningLoadW: 3000,
        peakLoadW: 5000,
        safetyMargin: 20
      });
      // 5kW * 1.2 = 6kW
      expect(results.estimatedCapacityKW).toBe(6);
    });

    it('picks the maximum requirement', () => {
      const results = calculateInverterSize({
        solarArraySizeKW: 4, // needs 3.33kW (ratio 1.2)
        peakLoadW: 5000, // needs 5.5kW (margin 10%)
        targetDcAcRatio: 1.2,
        safetyMargin: 10
      });
      expect(results.estimatedCapacityKW).toBe(5.5);
    });
  });

  describe('calculateInverterLoad', () => {
    it('summates running and estimates peak correctly', () => {
      const appliances = [
        { name: 'Light', quantity: 10, runningWatts: 10, surgeWatts: 10 },
        { name: 'Fridge', quantity: 1, runningWatts: 200, surgeWatts: 1200 },
        { name: 'Fan', quantity: 2, runningWatts: 75, surgeWatts: 150 }
      ];
      // Total Running: 100 + 200 + 150 = 450
      // Max Surge Diff: Fridge (1200 - 200 = 1000) vs Fan (300 - 150 = 150)
      // Estimated Peak: 450 + 1000 = 1450
      const results = calculateInverterLoad(appliances);
      expect(results.totalRunningWatts).toBe(450);
      expect(results.estimatedPeakWatts).toBe(1450);
    });

    it('handles no surge specified', () => {
      const appliances = [
        { name: 'Heater', quantity: 1, runningWatts: 1500 }
      ];
      const results = calculateInverterLoad(appliances);
      expect(results.totalRunningWatts).toBe(1500);
      expect(results.estimatedPeakWatts).toBe(1500);
    });
  });
});
