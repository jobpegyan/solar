import { supabase } from "@/integrations/supabase/client";

export type LocationLevel = 'Global' | 'Country' | 'Region' | 'City' | 'ZIP Code' | 'PIN Code' | 'Postal Code' | 'Postcode' | 'CAP' | 'Código Postal' | 'Code Postal';

export interface ResolvedLocation {
  countryId: string;
  countryCode: string;
  countryName: string;
  regionId?: string;
  regionCode?: string;
  regionName?: string;
  locationId?: string;
  cityName?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  level: LocationLevel;
  postalCodeLabel: string;
}

export async function resolveLocation(countryCode: string, query?: string): Promise<ResolvedLocation | null> {
  // 1. Get Country Info first
  const { data: countryData, error: countryError } = await supabase
    .from('countries')
    .select('id, code, name, postal_code_label')
    .eq('code', countryCode)
    .single();

  if (countryError || !countryData) return null;

  const baseLocation: ResolvedLocation = {
    countryId: countryData.id,
    countryCode: countryData.code,
    countryName: countryData.name,
    level: 'Country',
    postalCodeLabel: countryData.postal_code_label || 'Postal Code'
  };

  if (!query) return baseLocation;

  // 2. Try to resolve by Postal Code or City Name
  // We search in the locations table
  const { data: locationData } = await supabase
    .from('locations')
    .select('id, region_id, name, postal_code, latitude, longitude, regions(code, name)')
    .eq('country_id', countryData.id)
    .or(`postal_code.eq."${query}",name.ilike."${query}"`)
    .eq('status', 'active')
    .limit(1)
    .maybeSingle();

  if (locationData) {
    return {
      ...baseLocation,
      regionId: locationData.region_id,
      regionCode: (locationData.regions as any)?.code,
      regionName: (locationData.regions as any)?.name,
      locationId: locationData.id,
      cityName: locationData.name,
      postalCode: locationData.postal_code,
      latitude: Number(locationData.latitude),
      longitude: Number(locationData.longitude),
      level: locationData.postal_code?.toLowerCase() === query.toLowerCase() ? (countryData.postal_code_label || 'Postal Code') : 'City'
    };
  }

  // 3. Try to resolve by Region name/code if not found in locations
  const { data: regionData } = await supabase
    .from('regions')
    .select('id, code, name')
    .eq('country_id', countryData.id)
    .or(`code.eq."${query}",name.ilike."${query}"`)
    .eq('status', 'active')
    .limit(1)
    .maybeSingle();

  if (regionData) {
    return {
      ...baseLocation,
      regionId: regionData.id,
      regionCode: regionData.code,
      regionName: regionData.name,
      level: 'Region'
    };
  }

  return baseLocation;
}

export async function searchLocations(countryCode: string, query: string) {
  if (query.length < 2) return [];

  const { data: countryData } = await supabase
    .from('countries')
    .select('id')
    .eq('code', countryCode)
    .single();

  if (!countryData) return [];

  const { data } = await supabase
    .from('locations')
    .select('id, name, postal_code, regions(name)')
    .eq('country_id', countryData.id)
    .or(`postal_code.ilike."%${query}%",name.ilike."%${query}%"`)
    .eq('status', 'active')
    .limit(10);

  return data || [];
}
