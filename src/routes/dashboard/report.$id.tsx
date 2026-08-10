import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getCalculationById } from "@/lib/user.functions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Printer, Download, Share2, Sun, DollarSign, Home, Zap, Award, Info } from "lucide-react";
import { SolarChart } from "@/components/SolarChart";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/dashboard/report/$id")({
  component: ReportPage,
  head: () => ({
    title: "Solar Project Report | Solar Panel Calculator",
    meta: [{ name: "robots", content: "noindex" }],
  }),
});

function ReportPage() {
  const { id } = Route.useParams();
  const { data: calc } = useSuspenseQuery({
    queryKey: ['calculation', id],
    queryFn: () => getCalculationById({ data: { id: id as string } })
  });

  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  if (!calc) return <div>Calculation not found</div>;

  // Mock monthly data for chart
  const monthlyData = [
    { name: "Jan", generation: calc.system_size_kw * 120 },
    { name: "Feb", generation: calc.system_size_kw * 135 },
    { name: "Mar", generation: calc.system_size_kw * 155 },
    { name: "Apr", generation: calc.system_size_kw * 170 },
    { name: "May", generation: calc.system_size_kw * 185 },
    { name: "Jun", generation: calc.system_size_kw * 190 },
    { name: "Jul", generation: calc.system_size_kw * 195 },
    { name: "Aug", generation: calc.system_size_kw * 180 },
    { name: "Sep", generation: calc.system_size_kw * 165 },
    { name: "Oct", generation: calc.system_size_kw * 145 },
    { name: "Nov", generation: calc.system_size_kw * 130 },
    { name: "Dec", generation: calc.system_size_kw * 115 },
  ];

  return (
    <div className="container py-8 md:py-12 max-w-4xl print:p-0 print:max-w-none">
      <div className="flex justify-between items-center mb-8 print:hidden">
        <h1 className="text-2xl font-bold">Project Report</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={handlePrint}>
            <Printer className="w-4 h-4" />
            Print PDF
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Download
          </Button>
          <Button variant="solar" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden print:border-none print:shadow-none">
        {/* Report Header */}
        <div className="bg-slate-900 text-white p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sun className="w-8 h-8 text-solar" />
              <span className="text-2xl font-bold tracking-tight">Solar Panel Calculator</span>
            </div>
            <h2 className="text-3xl font-bold mb-1">{calc.name}</h2>
            <p className="text-slate-400">Custom Solar Feasibility Report • {new Date(calc.created_at).toLocaleDateString()}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-lg">
            <div className="text-sm text-slate-300 mb-1 uppercase tracking-wider font-semibold">Project ID</div>
            <div className="font-mono text-xl">{id.substring(0, 8).toUpperCase()}</div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="p-8 md:p-12 space-y-12">
          <section>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 pb-2 border-b">
              <Award className="w-5 h-5 text-solar" />
              Executive Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">System Size</div>
                <div className="text-2xl font-bold">{calc.system_size_kw} kW</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Annual Production</div>
                <div className="text-2xl font-bold">{(calc.system_size_kw * 5 * 365 * 0.8).toLocaleString()} kWh</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Est. Payback</div>
                <div className="text-2xl font-bold text-green-600">6.2 Years</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">25-Year Savings</div>
                <div className="text-2xl font-bold text-green-600">2,850</div>
              </div>
            </div>
          </section>

          {/* System Specifications */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 pb-2 border-b">
                <Zap className="w-5 h-5 text-solar" />
                System Details
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-dashed">
                  <span className="text-muted-foreground">Panels Required</span>
                  <span className="font-semibold">{Math.ceil(calc.system_size_kw * 1000 / 550)} × 550W Panels</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed">
                  <span className="text-muted-foreground">Roof Area Needed</span>
                  <span className="font-semibold">{Math.ceil(calc.system_size_kw * 1000 / 550 * 2.2)} m²</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed">
                  <span className="text-muted-foreground">Inverter Rating</span>
                  <span className="font-semibold">{calc.system_size_kw} kW String Inverter</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed">
                  <span className="text-muted-foreground">Efficiency Factor</span>
                  <span className="font-semibold">80% Performance Ratio</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 pb-2 border-b">
                <DollarSign className="w-5 h-5 text-solar" />
                Financial Analysis
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-dashed">
                  <span className="text-muted-foreground">Estimated Gross Cost</span>
                  <span className="font-semibold">5,400</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed text-green-600">
                  <span>Available Incentives (ITC)</span>
                  <span className="font-semibold">- ,620</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed bg-slate-50 px-2 font-bold">
                  <span>Net System Cost</span>
                  <span>0,780</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed">
                  <span className="text-muted-foreground">Net Energy Savings (Year 1)</span>
                  <span className="font-semibold text-green-600">,740</span>
                </div>
              </div>
            </div>
          </section>

          {/* Performance Chart */}
          <section className="print:break-before-page pt-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 pb-2 border-b">
              <Sun className="w-5 h-5 text-solar" />
              Estimated Monthly Production
            </h3>
            <div className="h-[300px] w-full">
              <SolarChart 
                data={monthlyData} 
                xKey="name" 
                yKey="generation" 
                type="bar" 
              />
            </div>
            <p className="text-xs text-muted-foreground mt-4 italic">
              *Estimates are based on historical solar irradiance data for your region. Actual performance may vary due to weather conditions and installation specifics.
            </p>
          </section>

          {/* Environmental Impact */}
          <section className="bg-slate-900 text-white rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <Home className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold">Environmental Impact</h4>
                <p className="text-slate-400">Your transition to clean energy matters.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-green-400">12.4</div>
                <div className="text-sm text-slate-400">Tons CO2 Saved / Year</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">185</div>
                <div className="text-sm text-slate-400">Trees Planted Equivalent</div>
              </div>
            </div>
          </section>
        </div>

        {/* Report Footer */}
        <div className="bg-slate-50 border-t p-8 text-center text-sm text-muted-foreground">
          <p className="mb-2">Generated by Solar Panel Calculator (solarpanel-calculator.com)</p>
          <div className="flex justify-center items-center gap-4">
            <a href="#" className="hover:text-solar">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-solar">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-solar">Support Center</a>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm print:hidden">
        <Info className="w-5 h-5 shrink-0" />
        <p>This report is for informational purposes only. We recommend consulting with a certified solar installer for an on-site evaluation before making any purchase decisions.</p>
      </div>
    </div>
  );
}
