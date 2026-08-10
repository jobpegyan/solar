// src/lib/monetization/constants.ts
import { AdPlacement } from "./types";

export const DEFAULT_AD_PLACEMENTS: Record<string, AdPlacement> = {
  homepage_top: {
    id: 'homepage_top',
    name: 'Homepage Top',
    enabled: true,
    type: 'responsive',
  },
  homepage_content: {
    id: 'homepage_content',
    name: 'Homepage Content',
    enabled: true,
    type: 'responsive',
  },
  calculator_before: {
    id: 'calculator_before',
    name: 'Before Calculator',
    enabled: true,
    type: 'responsive',
  },
  calculator_after: {
    id: 'calculator_after',
    name: 'After Calculator',
    enabled: true,
    type: 'responsive',
  },
  calculator_sidebar: {
    id: 'calculator_sidebar',
    name: 'Calculator Sidebar',
    enabled: true,
    type: 'responsive',
  },
  guide_after_intro: {
    id: 'guide_after_intro',
    name: 'Guide After Intro',
    enabled: true,
    type: 'responsive',
  },
  guide_content: {
    id: 'guide_content',
    name: 'Guide In-Content',
    enabled: true,
    type: 'responsive',
  },
  guide_end: {
    id: 'guide_end',
    name: 'Guide End',
    enabled: true,
    type: 'responsive',
  },
  category_content: {
    id: 'category_content',
    name: 'Category Content',
    enabled: true,
    type: 'responsive',
  },
};
