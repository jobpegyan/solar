import { getCountries, getCountryByCode } from '../../data/countries';
import { conversions } from './units';
import { formatCurrency, formatNumber, formatEnergy } from '../formatters';

export const i18n = {
  getCountries,
  getCountryByCode,
  units: conversions,
  formatCurrency,
  formatNumber,
  formatEnergy
};

