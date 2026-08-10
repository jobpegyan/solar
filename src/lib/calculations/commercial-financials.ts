import { FinancialProjectionYear } from './solar-payback';

export interface CommercialROIResults {
  irr: number | null;
  lifetimeNetBenefit: number;
  roi: number;
  paybackYears: number;
}

/**
 * Calculates Internal Rate of Return (IRR) using Newton-Raphson method
 */
export const calculateIRR = (cashFlows: number[], estimate = 0.1): number | null => {
  const maxIterations = 100;
  const precision = 1e-7;
  let rate = estimate;

  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let dNpv = 0;

    for (let t = 0; t < cashFlows.length; t++) {
      const denom = Math.pow(1 + rate, t);
      const cf = cashFlows[t] ?? 0;
      npv += cf / denom;
      dNpv -= (t * cf) / Math.pow(1 + rate, t + 1);
    }

    if (Math.abs(dNpv) < precision) return null;

    const newRate = rate - npv / dNpv;
    if (Math.abs(newRate - rate) < precision) return newRate;
    rate = newRate;
  }

  return rate > -1 && rate < 1 ? rate : null;
};

export const calculateCommercialFinancials = (
  projection: FinancialProjectionYear[],
  initialInvestment: number
): CommercialROIResults => {
  const cashFlows = [-initialInvestment, ...projection.map(p => p.netCashFlow)];
  
  const irr = calculateIRR(cashFlows);
  const lastYear = projection[projection.length - 1];
  const totalBenefit = lastYear ? lastYear.cumulativeBenefit : -initialInvestment;
  const lifetimeNetBenefit = totalBenefit;
  const roi = (lifetimeNetBenefit / initialInvestment) * 100;
  
  const paybackYear = projection.find(p => p.cumulativeBenefit >= 0)?.year || projection.length;

  return {
    irr,
    lifetimeNetBenefit,
    roi,
    paybackYears: paybackYear
  };
};
