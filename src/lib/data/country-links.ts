import { countries } from './countries';

/** Country code -> localized calculator hub slug (routes under /solar-calculator/*). */
const COUNTRY_SLUGS: Record<string, string> = {
  US: 'usa',
  IN: 'india',
  CA: 'canada',
  AU: 'australia',
  GB: 'uk',
  DE: 'germany',
  FR: 'france',
  ES: 'spain',
  IT: 'italy',
  NL: 'netherlands',
  NZ: 'new-zealand',
  ZA: 'south-africa',
};

export interface CountryNavLink {
  code: string;
  name: string;
  href: string;
}

/** Enabled countries that have a localized hub page. */
export function getCountryNavLinks(): CountryNavLink[] {
  return countries
    .filter((c) => c.enabled && COUNTRY_SLUGS[c.code])
    .map((c) => ({
      code: c.code,
      name: c.code === 'GB' ? 'United Kingdom' : c.name,
      href: `/solar-calculator/${COUNTRY_SLUGS[c.code]}`,
    }));
}
