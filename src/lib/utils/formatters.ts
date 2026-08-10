import { getCountryByCode } from '@/lib/data/countries';

export const formatCurrency = (amount: number, currencyCode: string = 'USD', countryCode?: string) => {
  // Try to find locale based on currency or explicitly provided country
  let locale = 'en-US';
  
  if (countryCode) {
    locale = getCountryByCode(countryCode).locale;
  } else {
    // Fallbacks for known currencies
    switch (currencyCode) {
      case 'INR': locale = 'en-IN'; break;
      case 'EUR': locale = 'de-DE'; break; // Default EUR to German format or similar
      case 'GBP': locale = 'en-GB'; break;
      case 'CAD': locale = 'en-CA'; break;
      case 'AUD': locale = 'en-AU'; break;
      case 'NZD': locale = 'en-NZ'; break;
      case 'ZAR': locale = 'en-ZA'; break;
      default: locale = 'en-US';
    }
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num: number, countryCode: string = 'US') => {
  const locale = getCountryByCode(countryCode).locale;
  return new Intl.NumberFormat(locale).format(num);
};

export const formatEnergy = (kWh: number, countryCode: string = 'US') => {
  const country = getCountryByCode(countryCode);
  const formatted = formatNumber(kWh, countryCode);
  
  if (country.energyUnit === 'units') {
    return `${formatted} units`;
  }
  return `${formatted} kWh`;
};

