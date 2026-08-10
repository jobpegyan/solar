import { describe, it, expect } from 'vitest';
import { calculateBatterySize, calculateBatteryRuntime } from '@/lib/calculations/battery';

describe('Battery Calculation Logic', () => {
  describe('calculateBatterySize', () => {
    it('calculates required capacity correctly', () => {
      const inputs = {
        backupLoadW: 1000,
        backupDurationHours: 10,
        batteryEfficiency: 90,
        depthOfDischarge: 80,
        reservePercentage: 0
      };
      // (1000 * 10) / 1000 = 10kWh base
      // 10 / 0.9 = 11.11 usable
      // 11.11 / 0.8 = 13.89 nominal
      const result = calculateBatterySize(inputs);
      expect(result.requiredNominalCapacityKWh).toBeCloseTo(13.89, 2);
    });
  });

  describe('calculateBatteryRuntime', () => {
    it('calculates runtime correctly', () => {
      const inputs = {
        batteryCapacityKWh: 10,
        depthOfDischarge: 100,
        batteryEfficiency: 90,
        inverterEfficiency: 100,
        backupLoadW: 1000,
        stateOfCharge: 100
      };
      // Usable energy: 10 * (1.0 - 0) = 10
      // Available AC: 10 * 0.9 * 1.0 = 9 kWh
      // Time: 9000 / 1000 = 9 hours
      const result = calculateBatteryRuntime(inputs);
      expect(result.estimatedBackupTimeHours).toBe(9);
    });
  });
});
