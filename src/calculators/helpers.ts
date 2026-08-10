import { CALCULATORS, CATEGORIES } from './registry';
import { CalculatorDefinition, CalculatorCategory, CalculatorCountry } from './types';
import * as LucideIcons from 'lucide-react';

export function getCalculatorsByCategory(category: CalculatorCategory | 'load-micro'): CalculatorDefinition[] {
  if (category === 'load-micro') {
    return CALCULATORS.filter(c => c.category === 'load' || c.category === 'micro' || c.category === 'conversion');
  }
  return CALCULATORS.filter(c => c.category === category);
}

export function getFeaturedCalculators(): CalculatorDefinition[] {
  return CALCULATORS.filter(c => c.featured);
}

export function getRelatedCalculators(currentId: string): CalculatorDefinition[] {
  const current = CALCULATORS.find(c => c.id === currentId);
  if (!current || !current.relatedCalculators) return [];
  
  return CALCULATORS.filter(c => current.relatedCalculators?.includes(c.id));
}

export function getAllCalculators(): CalculatorDefinition[] {
  return CALCULATORS;
}

export function getActiveCalculators(): CalculatorDefinition[] {
  return CALCULATORS.filter(c => c.status === 'active');
}

export function getCalculatorById(id: string): CalculatorDefinition | undefined {
  return CALCULATORS.find(c => c.id === id);
}

export function getCalculatorBySlug(slug: string): CalculatorDefinition | undefined {
  const normalizedSlug = slug.startsWith('/') ? slug : `/${slug}`;
  return CALCULATORS.find(c => c.slug === normalizedSlug || c.slug === slug);
}

export function getCalculatorsByCountry(country: CalculatorCountry): CalculatorDefinition[] {
  return CALCULATORS.filter(c => c.countries.includes(country) || c.countries.includes('GLOBAL'));
}

export function getIconComponent(iconName: string) {
  return (LucideIcons as any)[iconName] || LucideIcons.Calculator;
}
