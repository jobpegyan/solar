import * as React from "react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts"

interface SolarChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  yKey2?: string;
  type?: 'bar' | 'line';
  valuePrefix?: string;
  valueSuffix?: string;
}

export function SolarChart({ 
  data, 
  xKey, 
  yKey, 
  yKey2,
  type = 'bar', 
  valuePrefix = '', 
  valueSuffix = '' 
}: SolarChartProps) {
  const ChartComponent = type === 'bar' ? BarChart : LineChart;
  const DataComponent = type === 'bar' ? Bar : Line;

  return (
    <div className="h-[300px] w-full mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey={xKey} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#888888', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#888888', fontSize: 12 }}
          />
          <RechartsTooltip 
            cursor={{ fill: '#f8f8f8' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm text-xs font-medium space-y-1">
                    {payload.map((entry, index) => (
                      <div key={index} style={{ color: entry.color }}>
                        {entry.name}: {valuePrefix}{entry.value}{valueSuffix}
                      </div>
                    ))}
                  </div>
                )
              }
              return null
            }}
          />
          {yKey2 && <Legend verticalAlign="top" height={36} />}
          <DataComponent 
            name={yKey === 'cashflow' ? 'Cumulative Savings' : yKey === 'generation' ? 'Generation (kWh)' : yKey}
            dataKey={yKey} 
            fill="#FFB800"
            stroke="#FFB800"
            strokeWidth={type === 'line' ? 3 : 0}
            radius={type === 'bar' ? 4 : 0}
            dot={type === 'line'}
          />
          {yKey2 && (
            <DataComponent 
              name={yKey2 === 'investment' ? 'Net Investment' : yKey2 === 'consumption' ? 'Consumption (kWh)' : yKey2}
              dataKey={yKey2} 
              fill="#ef4444"
              stroke="#ef4444"
              strokeWidth={type === 'line' ? 2 : 0}
              strokeDasharray="5 5"
              radius={type === 'bar' ? 4 : 0}
              dot={false}
            />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  )
}
