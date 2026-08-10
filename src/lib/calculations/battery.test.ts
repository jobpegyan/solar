import { describe, it, expect } from 'vitest';
import { calculateBatterySize, calculateBatteryRuntime } from './battery';

describe('Battery Logic', () => {
  describe('calculateBatterySize', () => {
    it('calculates basic capacity correctly', () => {
      const results = calculateBatterySize({
        backupLoadW: 1000,
        backupDurationHours: 8,
        batteryEfficiency: 100,
        depthOfDischarge: 100,
        reservePercentage: 0
      });
      expect(results.backupEnergyRequiredKWh).toBe(8);
      expect(results.requiredNominalCapacityKWh).toBe(8);
    });

    it('accounts for efficiency and DoD', () => {
      // 8kWh / 0.8 DoD / 0.9 Efficiency = 11.11 kWh
      const results = calculateBatterySize({
        backupLoadW: 1000,
        backupDurationHours: 8,
        batteryEfficiency: 90,
        depthOfDischarge: 80,
        reservePercentage: 0
      });
      expect(results.requiredNominalCapacityKWh).toBeCloseTo(11.11, 2);
    });

    it('accounts for reserve percentage', () => {
      const results = calculateBatterySize({
        backupLoadW: 1000,
        backupDurationHours: 8,
        batteryEfficiency: 100,
        depthOfDischarge: 100,
        reservePercentage: 20
      });
      expect(results.requiredNominalCapacityKWh).toBe(9.6); // 8 * 1.2
    });
  });

  describe('calculateBatteryRuntime', () => {
    it('calculates runtime for full battery', () => {
      const results = calculateBatteryRuntime({
        batteryCapacityKWh: 10,
        depthOfDischarge: 100,
        batteryEfficiency: 100,
        inverterEfficiency: 100,
        backupLoadW: 1000,
        stateOfCharge: 100
      });
      expect(results.estimatedBackupTimeHours).toBe(10);
    });

    it('calculates runtime with losses', () => {
      // 10kWh * 0.8 DoD = 8kWh usable
      // 8kWh * 0.9 BattEff * 0.95 InvEff = 6.84 kWh AC
      // 6.84kWh / 1kW = 6.84 hours
      const results = calculateBatteryRuntime({
        batteryCapacityKWh: 10,
        depthOfDischarge: 80,
        batteryEfficiency: 90,
        inverterEfficiency: 95,
        backupLoadW: 1000,
        stateOfCharge: 100
      });
      expect(results.estimatedBackupTimeHours).toBeCloseTo(6.84, 2);
    });

    it('respects state of charge', () => {
      // 10kWh battery. 80% DoD means min SoC is 20%.
      // If current SoC is 50%, available is 30% of nominal.
      // 3kWh * 1.0 efficiencies / 1kW = 3 hours.
      const results = calculateBatteryRuntime({
        batteryCapacityKWh: 10,
        depthOfDischarge: 80,
        batteryEfficiency: 100,
        inverterEfficiency: 100,
        backupLoadW: 1000,
        stateOfCharge: 50
      });
      expect(results.estimatedBackupTimeHours).toBeCloseTo(3, 1);
    });

    it('returns 0 for 0 load', () => {
      const results = calculateBatteryRuntime({
        batteryCapacityKWh: 10,
        depthOfDischarge: 80,
        batteryEfficiency: 100,
        inverterEfficiency: 100,
        backupLoadW: 0,
        stateOfCharge: 100
      });
      expect(results.estimatedBackupTimeHours).toBe(0);
    });
  });
});
