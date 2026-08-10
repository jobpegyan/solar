import { describe, it, expect } from 'vitest';
import { getCalculatorById, getCalculatorBySlug, getCalculatorsByCategory, getFeaturedCalculators, getRelatedCalculators, getCalculatorsByCountry } from './helpers';

describe('Calculator Registry Foundation', () => {
  it('should find a calculator by ID', () => {
    const calc = getCalculatorById('solar-panel-calculator');
    expect(calc).toBeDefined();
    expect(calc?.name).toBe('Solar Panel Calculator');
  });

  it('should find a calculator by slug', () => {
    const calc = getCalculatorBySlug('/');
    expect(calc?.id).toBe('solar-panel-calculator');
    
    const batteryCalc = getCalculatorBySlug('/solar-battery-size-calculator');
    expect(batteryCalc?.id).toBe('solar-battery-size-calculator');
  });

  it('should return undefined for non-existent calculator', () => {
    expect(getCalculatorById('non-existent')).toBeUndefined();
    expect(getCalculatorBySlug('/non-existent')).toBeUndefined();
  });

  it('should filter by category', () => {
    const calcs = getCalculatorsByCategory('cost-savings');
    expect(calcs.length).toBeGreaterThan(0);
    calcs.forEach(c => expect(c.category).toBe('cost-savings'));
  });

  it('should return featured calculators', () => {
    const featured = getFeaturedCalculators();
    expect(featured.length).toBeGreaterThan(0);
    featured.forEach(c => expect(c.featured).toBe(true));
  });

  it('should lookup related calculators', () => {
    const related = getRelatedCalculators('solar-panel-calculator');
    expect(related.length).toBeGreaterThan(0);
    expect(related.some(r => r.id === 'solar-panel-savings-calculator')).toBe(true);
  });

  it('should filter by country (including GLOBAL)', () => {
    const usCalcs = getCalculatorsByCountry('US');
    expect(usCalcs.length).toBeGreaterThan(0);
    
    const indiaCalcs = getCalculatorsByCountry('IN');
    expect(indiaCalcs.length).toBeGreaterThan(0);
  });

  it('should respect status filtering', () => {
    const active = getActiveCalculators();
    const comingSoon = active.find((c: any) => c.status === 'coming-soon');
    expect(comingSoon).toBeUndefined();
  });
});

import { getActiveCalculators } from './helpers';
