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

  it('should find all newly registered load and micro calculators by ID and slug', () => {
    const ids = [
      'home-load-solar-calculator',
      'ac-load-solar-calculator',
      'kw-to-solar-panels-calculator',
      'watts-to-solar-panels-calculator',
      'electricity-bill-to-solar-size-calculator',
      'solar-battery-calculator',
      'solar-cost-calculator',
      'solar-inverter-calculator',
      'solar-payback-calculator',
      'solar-roi-calculator',
      'solar-savings-calculator'
    ];

    ids.forEach(id => {
      const calc = getCalculatorById(id);
      expect(calc, `Calculator with ID '${id}' should be defined in registry`).toBeDefined();
      const slugCalc = getCalculatorBySlug(calc!.slug);
      expect(slugCalc, `Calculator with slug '${calc!.slug}' should be found`).toBeDefined();
    });
  });
});

import { getActiveCalculators } from './helpers';

