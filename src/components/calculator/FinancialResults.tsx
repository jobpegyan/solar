import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSolarSettings } from '@/lib/location/location-context';
import { TrendingUp, DollarSign, Calendar, History, Info } from 'lucide-react';
import { Link } from '@tanstack/react-router';

// Helper to format currency if format util is missing
const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};


interface FinancialResultsProps {
  results: any;
  type: 'cost' | 'savings' | 'roi' | 'payback' | 'bill';
}

export function FinancialResults({ results, type }: FinancialResultsProps) {
  const { currency, country } = useSolarSettings();
  
  // These results usually come from calculateSolarFinancials which combines cost, savings, and roi
  // For now we map existing SystemResults if needed or use the new structure
  const financialData = results.financials || {
    cost: {
      estimatedNetCost: results.estimatedNetCost || 0,
      grossProjectCost: results.grossProjectCost || 0,
      estimatedIncentives: results.incentives || 0,
    },
    savings: {
      annualSavings: results.annualSavings || 0,
      monthlySavings: (results.annualSavings || 0) / 12,
    },
    roi: {
      paybackPeriod: results.paybackPeriod || 0,
      simpleROI: results.simpleROI || 0,
    }
  };

  const renderCostResults = () => (
    <div className="space-y-6">
      <Card className="bg-solar/5 border-solar/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-solar flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Estimated Net Cost
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-black">{formatCurrency(financialData.cost.estimatedNetCost, currency)}</div>
          <p className="text-xs text-muted-foreground mt-2">After estimated incentives and tax credits</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">Gross Project Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatCurrency(financialData.cost.grossProjectCost, currency)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">Potential Incentives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-600">-{formatCurrency(financialData.cost.estimatedIncentives, currency)}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {type === 'cost' && renderCostResults()}
      {/* Other types would be implemented here */}
      
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex gap-3">
        <Info className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-slate-600 leading-relaxed">
          These calculations are estimates for informational and planning purposes only. 
          Actual project costs, electricity savings, incentives, payback periods and financial outcomes can vary significantly. 
          This calculator does not provide financial, investment or tax advice. 
          Learn more in our <Link to="/disclaimer" className="text-solar underline">disclaimer</Link>.
        </p>
      </div>
    </div>
  );
}
