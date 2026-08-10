export type MeasurementSystem = 'Metric' | 'US';

export interface Country {
  code: string;
  name: string;
  officialName?: string;
  currency: string;
  currencySymbol: string;
  locale: string;
  measurementSystem: MeasurementSystem;
  temperatureUnit: 'Celsius' | 'Fahrenheit';
  areaUnit: 'sq m' | 'sq ft';
  energyUnit: 'kWh' | 'units';
  powerUnit: 'kW' | 'W';
  postalCodeLabel: string;
  postalCodeFormat?: string;
  postalCodeRequired: boolean;
  enabled: boolean;
  defaultElectricityRate?: number;
  defaultPeakSunHours?: number;
  defaultPerformanceRatio: number;
}

export const countries: Country[] = [
  {
    code: 'US',
    name: 'United States',
    officialName: 'United States of America',
    currency: 'USD',
    currencySymbol: '$',
    locale: 'en-US',
    measurementSystem: 'US',
    temperatureUnit: 'Fahrenheit',
    areaUnit: 'sq ft',
    energyUnit: 'kWh',
    powerUnit: 'kW',
    postalCodeLabel: 'ZIP Code',
    postalCodeRequired: true,
    enabled: true,
    defaultElectricityRate: 0.16,
    defaultPeakSunHours: 5.0,
    defaultPerformanceRatio: 0.75,
  },
  {
    code: 'IN',
    name: 'India',
    officialName: 'Republic of India',
    currency: 'INR',
    currencySymbol: '₹',
    locale: 'en-IN',
    measurementSystem: 'Metric',
    temperatureUnit: 'Celsius',
    areaUnit: 'sq m',
    energyUnit: 'units',
    powerUnit: 'kW',
    postalCodeLabel: 'PIN Code',
    postalCodeRequired: true,
    enabled: true,
    defaultElectricityRate: 7.5,
    defaultPeakSunHours: 5.0,
    defaultPerformanceRatio: 0.8,
  },
  {
    code: 'CA',
    name: 'Canada',
    currency: 'CAD',
    currencySymbol: 'C$',
    locale: 'en-CA',
    measurementSystem: 'Metric',
    temperatureUnit: 'Celsius',
    areaUnit: 'sq m',
    energyUnit: 'kWh',
    powerUnit: 'kW',
    postalCodeLabel: 'Postal Code',
    postalCodeRequired: true,
    enabled: true,
    defaultElectricityRate: 0.14,
    defaultPeakSunHours: 4.2,
    defaultPerformanceRatio: 0.75,
  },
  {
    code: 'AU',
    name: 'Australia',
    currency: 'AUD',
    currencySymbol: 'A$',
    locale: 'en-AU',
    measurementSystem: 'Metric',
    temperatureUnit: 'Celsius',
    areaUnit: 'sq m',
    energyUnit: 'kWh',
    powerUnit: 'kW',
    postalCodeLabel: 'Postcode',
    postalCodeRequired: true,
    enabled: true,
    defaultElectricityRate: 0.30,
    defaultPeakSunHours: 5.5,
    defaultPerformanceRatio: 0.8,
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    currency: 'GBP',
    currencySymbol: '£',
    locale: 'en-GB',
    measurementSystem: 'Metric',
    temperatureUnit: 'Celsius',
    areaUnit: 'sq m',
    energyUnit: 'kWh',
    powerUnit: 'kW',
    postalCodeLabel: 'Postcode',
    postalCodeRequired: true,
    enabled: true,
    defaultElectricityRate: 0.28,
    defaultPeakSunHours: 3.5,
    defaultPerformanceRatio: 0.75,
  },
  {
    code: 'NZ',
    name: 'New Zealand',
    currency: 'NZD',
    currencySymbol: 'NZ$',
    locale: 'en-NZ',
    measurementSystem: 'Metric',
    temperatureUnit: 'Celsius',
    areaUnit: 'sq m',
    energyUnit: 'kWh',
    powerUnit: 'kW',
    postalCodeLabel: 'Postcode',
    postalCodeRequired: true,
    enabled: true,
    defaultElectricityRate: 0.30,
    defaultPeakSunHours: 4.5,
    defaultPerformanceRatio: 0.8,
  },
  {
    code: 'DE',
    name: 'Germany',
    currency: 'EUR',
    currencySymbol: '€',
    locale: 'de-DE',
    measurementSystem: 'Metric',
    temperatureUnit: 'Celsius',
    areaUnit: 'sq m',
    energyUnit: 'kWh',
    powerUnit: 'kW',
    postalCodeLabel: 'Postcode',
    postalCodeRequired: false,
    enabled: true,
    defaultElectricityRate: 0.35,
    defaultPeakSunHours: 3.8,
    defaultPerformanceRatio: 0.75,
  },
  {
    code: 'FR',
    name: 'France',
    currency: 'EUR',
    currencySymbol: '€',
    locale: 'fr-FR',
    measurementSystem: 'Metric',
    temperatureUnit: 'Celsius',
    areaUnit: 'sq m',
    energyUnit: 'kWh',
    powerUnit: 'kW',
    postalCodeLabel: 'Code Postal',
    postalCodeRequired: false,
    enabled: true,
    defaultElectricityRate: 0.23,
    defaultPeakSunHours: 4.5,
    defaultPerformanceRatio: 0.75,
  },
  {
    code: 'ES',
    name: 'Spain',
    currency: 'EUR',
    currencySymbol: '€',
    locale: 'es-ES',
    measurementSystem: 'Metric',
    temperatureUnit: 'Celsius',
    areaUnit: 'sq m',
    energyUnit: 'kWh',
    powerUnit: 'kW',
    postalCodeLabel: 'Código Postal',
    postalCodeRequired: false,
    enabled: true,
    defaultElectricityRate: 0.25,
    defaultPeakSunHours: 5.2,
    defaultPerformanceRatio: 0.75,
  },
  {
    code: 'IT',
    name: 'Italy',
    currency: 'EUR',
    currencySymbol: '€',
    locale: 'it-IT',
    measurementSystem: 'Metric',
    temperatureUnit: 'Celsius',
    areaUnit: 'sq m',
    energyUnit: 'kWh',
    powerUnit: 'kW',
    postalCodeLabel: 'CAP',
    postalCodeRequired: false,
    enabled: true,
    defaultElectricityRate: 0.28,
    defaultPeakSunHours: 4.8,
    defaultPerformanceRatio: 0.75,
  },
  {
    code: 'NL',
    name: 'Netherlands',
    currency: 'EUR',
    currencySymbol: '€',
    locale: 'nl-NL',
    measurementSystem: 'Metric',
    temperatureUnit: 'Celsius',
    areaUnit: 'sq m',
    energyUnit: 'kWh',
    powerUnit: 'kW',
    postalCodeLabel: 'Postcode',
    postalCodeRequired: false,
    enabled: true,
    defaultElectricityRate: 0.25,
    defaultPeakSunHours: 4.0,
    defaultPerformanceRatio: 0.75,
  },
  {
    code: 'ZA',
    name: 'South Africa',
    currency: 'ZAR',
    currencySymbol: 'R',
    locale: 'en-ZA',
    measurementSystem: 'Metric',
    temperatureUnit: 'Celsius',
    areaUnit: 'sq m',
    energyUnit: 'kWh',
    powerUnit: 'kW',
    postalCodeLabel: 'Postcode',
    postalCodeRequired: true,
    enabled: true,
    defaultElectricityRate: 2.8,
    defaultPeakSunHours: 5.5,
    defaultPerformanceRatio: 0.8,
  }
];

export const getCountries = () => countries;

export const getEnabledCountries = () => countries.filter(c => c.enabled);

export const getCountryByCode = (code: string): Country => {
  const country = countries.find(c => c.code.toUpperCase() === code.toUpperCase());
  if (!country) {
    console.warn(`Country with code ${code} not found, falling back to US`);
    return countries[0] as Country;
  }
  return country;
};



export const getCountryCurrency = (code: string) => getCountryByCode(code).currency;
export const getCountryLocale = (code: string) => getCountryByCode(code).locale;
export const getCountryUnits = (code: string) => ({
  system: getCountryByCode(code).measurementSystem,
  temperature: getCountryByCode(code).temperatureUnit,
  area: getCountryByCode(code).areaUnit,
  energy: getCountryByCode(code).energyUnit,
  power: getCountryByCode(code).powerUnit
});
