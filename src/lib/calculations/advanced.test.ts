import { describe, it, expect } from 'vitest';
import { 
  calculateOptimalTilt, 
  calculateIrradianceMetrics, 
  calculateShadingLoss, 
  calculateCombinedLosses 
} from './advanced';

describe('Advanced Solar Logic', () => {
  describe('calculateOptimalTilt', () => {
    it('estimates tilt for annual production (Northern Hemisphere)', () => {
      const res = calculateOptimalTilt({ latitude: 34, goal: 'annual' });
      expect(res.estimatedTilt).toBe(34);
    });
    it('estimates tilt for summer (Southern Hemisphere)', () => {
      const res = calculateOptimalTilt({ latitude: -30, goal: 'summer' });
      // Math.abs(-30) * 0.9 - 15 = 30 * 0.9 - 15 = 27 - 15 = 12
      expect(res.estimatedTilt).toBe(12);
    });
  });

  describe('calculateIrradianceMetrics', () => {
    it('converts PSH to annual energy', () => {
      const res = calculateIrradianceMetrics({ peakSunHours: 5 });
      expect(res.dailyEnergyKwhM2).toBe(5);
      expect(res.annualEstimate).toBe(5 * 365);
    });
  });

  describe('calculateShadingLoss', () => {
    it('correctly reduces production by shading %', () => {
      const res = calculateShadingLoss({ baselineProduction: 1000, shadingPercentage: 20 });
      expect(res.estimatedProduction).toBe(800);
      expect(res.totalShadingLoss).toBe(200);
    });
    it('handles 100% shading', () => {
      const res = calculateShadingLoss({ baselineProduction: 1000, shadingPercentage: 100 });
      expect(res.estimatedProduction).toBe(0);
    });
  });

  describe('calculateCombinedLosses', () => {
    it('applies losses sequentially', () => {
      const res = calculateCombinedLosses({
        initialOutput: 1000,
        losses: {
          panelDegradation: 10,
          inverter: 10,
          wiring: 0, soiling: 0, shading: 0, mismatch: 0, temperature: 0, other: 0
        }
      });
      // 1000 * 0.9 = 900
      // 900 * 0.9 = 810
      // Total loss = 19%
      expect(res.remainingOutput).toBe(810);
      expect(res.totalLossPercentage).toBe(19);
    });
  });
});
