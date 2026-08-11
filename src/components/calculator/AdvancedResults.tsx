import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Compass, 
  Sun, 
  CloudOff, 
  TrendingDown, 
  Maximize,
  ArrowRight,
  Info
} from 'lucide-react';

interface AdvancedResultsProps {
  results: any;
  type: 'tilt' | 'angle' | 'irradiance' | 'shading' | 'loss' | 'array';
}

export const AdvancedResults: React.FC<AdvancedResultsProps> = ({ results, type }) => {
  if (!results) return null;

  const renderTilt = () => {
    const data = results.tilt;
    if (!data) return null;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Maximize className="w-4 h-4 text-solar" />
              Estimated Planning Tilt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-solar">{data.estimatedTilt}°</div>
            <p className="text-xs text-muted-foreground mt-1">Based on {Math.abs(data.latitude)}° Latitude</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Compass className="w-4 h-4 text-solar" />
              Optimization Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="capitalize">{data.optimizationGoal} Production</Badge>
            <p className="text-xs text-muted-foreground mt-2">{data.guidance}</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderIrradiance = () => {
    const data = results.irradiance;
    if (!data) return null;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-muted-foreground mb-1">Peak Sun Hours</div>
            <div className="text-2xl font-bold">{data.peakSunHours} h</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-muted-foreground mb-1">Daily Solar Energy</div>
            <div className="text-2xl font-bold">{data.dailyEnergyKwhM2} kWh/m²</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-muted-foreground mb-1">Annual Energy Est.</div>
            <div className="text-2xl font-bold">{data.annualEstimate.toLocaleString()} kWh/m²</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-muted-foreground mb-1">Peak Irradiance</div>
            <div className="text-2xl font-bold">{data.irradianceWm2} W/m²</div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderShading = () => {
    const data = results.shading;
    if (!data) return null;
    return (
      <Card className="border-solar/20 bg-solar/5">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CloudOff className="w-4 h-4 text-amber-500" />
                Production After Shading
              </div>
              <div className="text-4xl font-bold text-solar mt-1">
                {Math.round(data.estimatedProduction).toLocaleString()} kWh
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-xs text-muted-foreground">Shading Loss</div>
                <div className="text-lg font-semibold text-red-500">-{Math.round(data.totalShadingLoss).toLocaleString()} kWh</div>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white/50 rounded-lg text-xs text-amber-800 border border-amber-200 flex gap-2">
            <Info className="w-4 h-4 shrink-0" />
            <span>Simplified estimate. Real-world shading is more complex.</span>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderLosses = () => {
    const data = results.losses;
    if (!data) return null;
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Estimated Combined Loss</div>
                <div className="text-3xl font-bold text-red-500">{data.totalLossPercentage}%</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-muted-foreground">Remaining Efficiency</div>
                <div className="text-3xl font-bold text-green-600">{Math.round(data.remainingFraction * 100)}%</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Loss Breakdown (Estimated kWh)</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(data.lossBreakdown).map(([key, value]) => (
              <div key={key} className="p-3 bg-muted rounded-lg">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                  {key.replace(/([A-Z])/g, ' $1')}
                </div>
                <div className="font-semibold text-sm">-{Math.round(value as number)} kWh</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderArray = () => {
    const data = results.array;
    if (!data) return null;
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-solar text-white border-none">
          <CardContent className="pt-6">
            <div className="text-sm opacity-90 mb-1">Required Array Capacity</div>
            <div className="text-3xl font-bold">{data.requiredSystemSizeKW} kW</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Estimated Panel Count</div>
            <div className="text-3xl font-bold">{data.panelCount} Panels</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Actual Installed Capacity</div>
            <div className="text-3xl font-bold">{(data.panelCount * 0.4).toFixed(2)} kW</div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderAngle = () => {
    const data = results.tilt;
    if (!data) return null;
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-solar/5 border-solar/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-solar flex items-center gap-2">
              <Maximize className="w-4 h-4" />
              Recommended Tilt Angle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-solar">{data.estimatedTilt}°</div>
            <p className="text-xs text-muted-foreground mt-1">Latitude: {Math.abs(data.latitude)}°</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Compass className="w-4 h-4 text-solar" />
              Optimal Azimuth Direction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.latitude >= 0 ? '180° True South' : '0° True North'}</div>
            <p className="text-xs text-muted-foreground mt-1">Maximum Solar Exposure</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Sun className="w-4 h-4 text-solar" />
              Sun Tracking Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="capitalize">Fixed Array Tilt</Badge>
            <p className="text-xs text-muted-foreground mt-2">Adjust ±15° seasonally for +5% yield</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderers: Record<string, () => React.ReactNode> = {
    tilt: renderTilt,
    angle: renderAngle,
    irradiance: renderIrradiance,
    shading: renderShading,
    loss: renderLosses,
    array: renderArray,
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-2">
          Calculation Results
          <Badge variant="outline" className="text-[10px] font-normal">Planning Estimate</Badge>
        </h3>
      </div>
      {renderers[type]?.()}
    </div>
  );
};
