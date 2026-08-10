import { countries, getCountryByCode } from "@/lib/data/countries";

export const formatCurrency = (amount: number, currencyCode: string, locale: string = 'en-US'): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (e) {
    // Fallback if Intl fails
    const country = countries.find(c => c.currency === currencyCode);
    const symbol = country?.currencySymbol || '$';
    return `${symbol}${amount.toLocaleString()}`;
  }
};

export const getCurrencySymbol = (currencyCode: string): string => {
  const country = countries.find(c => c.currency === currencyCode);
  return country?.currencySymbol || '$';
};
