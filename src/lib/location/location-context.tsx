import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Country, countries, getCountryByCode } from '@/lib/data/countries';
import { Region, getRegionsByCountry } from '@/lib/data/regions';
import { UnitSystem } from '@/lib/units/unit-utils';

interface SolarSettings {
  country: Country;
  region: Region | undefined;
  currency: string;
  unitSystem: UnitSystem;
  unitPreference: 'Automatic' | 'US' | 'Metric';
}

interface LocationContextType extends SolarSettings {
  setCountry: (code: string) => void;
  setRegion: (code: string | undefined) => void;
  setUnitPreference: (pref: 'Automatic' | 'US' | 'Metric') => void;
  setCurrency: (code: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  // Use a default country that is guaranteed to exist
  const defaultCountry = countries[0] as Country;
  
  const [country, setCountryState] = useState<Country>(defaultCountry);
  const [region, setRegionState] = useState<Region | undefined>(undefined);
  const [unitPreference, setUnitPrefState] = useState<'Automatic' | 'US' | 'Metric'>('Automatic');
  const [currency, setCurrencyState] = useState<string>(defaultCountry.currency);

  // Initialize from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('solar-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const c = countries.find(item => item.code === parsed.countryCode);
        if (c) {
          setCountryState(c);
          const rs = getRegionsByCountry(c.code);
          const r = rs.find(item => item.code === parsed.regionCode);
          setRegionState(r);
          setUnitPrefState(parsed.unitPreference || 'Automatic');
          setCurrencyState(parsed.currency || c.currency);
        }
      } catch (e) {
        console.error("Failed to load settings", e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('solar-settings', JSON.stringify({
      countryCode: country.code,
      regionCode: region?.code,
      unitPreference,
      currency
    }));
  }, [country, region, unitPreference, currency]);

  const setCountry = useCallback((code: string) => {
    const newCountry = getCountryByCode(code);
    setCountryState(newCountry);
    setRegionState(undefined); // Reset region on country change
    setCurrencyState(newCountry.currency);
  }, []);

  const setRegion = useCallback((code: string | undefined) => {
    if (!code) {
      setRegionState(undefined);
      return;
    }
    setCountryState(currCountry => {
      const rs = getRegionsByCountry(currCountry.code);
      const r = rs.find(item => item.code === code);
      setRegionState(r);
      return currCountry;
    });
  }, []);

  const effectiveUnitSystem: UnitSystem = unitPreference === 'Automatic' 
    ? country.measurementSystem 
    : unitPreference;

  const value: LocationContextType = {
    country,
    region,
    currency,
    unitSystem: effectiveUnitSystem,
    unitPreference,
    setCountry,
    setRegion,
    setUnitPreference: (pref) => setUnitPrefState(pref),
    setCurrency: (code) => setCurrencyState(code),
  };

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export function useSolarSettings() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useSolarSettings must be used within a LocationProvider');
  }
  return context;
}
