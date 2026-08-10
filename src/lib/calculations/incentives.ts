export type IncentiveType = 'tax_credit' | 'rebate' | 'subsidy' | 'grant' | 'utility' | 'performance' | 'other';

export interface Incentive {
  id: string;
  programName: string;
  type: IncentiveType;
  amount?: number;
  percentage?: number;
  maxAmount?: number;
  eligibilitySummary: string;
  sourceUrl?: string;
  lastVerified: string;
}

export const calculateIncentiveImpact = (
  systemCost: number,
  incentives: Incentive[]
): number => {
  let totalIncentiveValue = 0;

  for (const incentive of incentives) {
    let value = 0;
    if (incentive.amount) {
      value = incentive.amount;
    } else if (incentive.percentage) {
      value = systemCost * (incentive.percentage / 100);
      if (incentive.maxAmount) {
        value = Math.min(value, incentive.maxAmount);
      }
    }
    totalIncentiveValue += value;
  }

  return totalIncentiveValue;
};
