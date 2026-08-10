import { describe, it, expect } from 'vitest';
import { calculateOptimalTilt, getOrientationGuidance, calculateCombinedLosses } from '@/lib/calculations/advanced';

describe('Advanced Solar Calculation Logic', () => {
  describe('calculateOptimalTilt', () => {
    it('calculates tilt for latitude 34 (US) - Annual', () => {
      const result = calculateOptimalTilt({ latitude: 34, goal: 'annual' });
      expect(result.estimatedTilt).toBe(34);
    });

    it('calculates tilt for Summer (flatter)', () => {
      const result = calculateOptimalTilt({ latitude: 34, goal: 'summer' });
      expect(result.estimatedTilt).toBe(15.6);
    });
  });

  describe('getOrientationGuidance', () => {
    it('recommends South (180) for Northern Hemisphere', () => {
      const result = getOrientationGuidance(34, 170);
      expect(result.recommendedAzimuth).toBe(180);
    });
  });

  describe('calculateCombinedLosses', () => {
    it('applies losses sequentially', () => {
      const inputs = {
        initialOutput: 1000,
        losses: {
          inverter: 10,
          wiring: 10,
          panelDegradation: 0,
          soiling: 0,
          shading: 0,
          mismatch: 0,
          temperature: 0,
          other: 0,
        }
      };
      const result = calculateCombinedLosses(inputs);
      expect(result.remainingOutput).toBe(810);
    });
  });
});
