import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { getSavedCalculations } from "@/lib/user.functions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PlusCircle, History, Calculator, User, Settings, ArrowRight, Star } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
  loader: async ({ context }) => {
    // In a real app, we'd check auth here
    // return context.queryClient.ensureQueryData({ queryKey: ['savedCalculations'], queryFn: () => getSavedCalculations() });
  },
  head: () => ({
    title: "User Dashboard | Solar Panel Calculator",
    meta: [{ name: "robots", content: "noindex" }],
  }),
});

function DashboardIndex() {
  const { user } = useAuth();
  
  // Using useQuery instead of suspense for this demo mock
  const { data: calculations = [] } = useSuspenseQuery({
    queryKey: ['savedCalculations'],
    queryFn: () => getSavedCalculations()
  });

  const recentCalculations = calculations.slice(0, 5);

  return (
    <div className="container py-12 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.full_name || 'Solar User'}</h1>
          <p className="text-muted-foreground text-lg">Manage your solar planning and estimates.</p>
        </div>
        <Button variant="solar" asChild>
          <Link to="/" className="gap-2">
            <PlusCircle className="w-4 h-4" />
            New Estimate
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="bg-solar/5 border-solar/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="w-5 h-5 text-solar" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-2">
            <Button variant="ghost" className="justify-start px-2 font-normal" asChild>
              <Link to="/">Calculate Solar System</Link>
            </Button>
            <Button variant="ghost" className="justify-start px-2 font-normal" asChild>
              <Link to="/dashboard/calculations">View Saved Estimates</Link>
            </Button>
            <Button variant="ghost" className="justify-start px-2 font-normal" asChild>
              <Link to="/dashboard/compare">Compare Scenarios</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-solar" />
              Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm">
              <p className="font-medium">{user?.email}</p>
              <p className="text-muted-foreground">United States | California</p>
            </div>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link to="/dashboard/settings">Edit Profile</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="w-5 h-5 text-solar" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Manage your notifications, currency and unit preferences.
            </div>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link to="/dashboard/settings">Account Settings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <History className="w-6 h-6 text-solar" />
            Recent Calculations
          </h2>
          <Button variant="link" asChild className="text-solar">
            <Link to="/dashboard/calculations">View All →</Link>
          </Button>
        </div>

        {recentCalculations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentCalculations.map((calc) => (
              <Card key={calc.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg leading-tight">{calc.name}</CardTitle>
                    {calc.is_favorite && <Star className="w-4 h-4 text-solar fill-solar" />}
                  </div>
                  <CardDescription>
                    {calc.calculator_type.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')} Calculator
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">System Size</span>
                    <span className="font-bold text-solar">{calc.system_size_kw} kW</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-muted-foreground">Last Updated</span>
                    <span>{new Date(calc.updated_at).toLocaleDateString()}</span>
                  </div>
                </CardContent>
                <CardContent className="pt-0 flex gap-2">
                  <Button size="sm" variant="solar" className="flex-1" asChild>
                    <Link to="/dashboard/calculations">View Result</Link>
                  </Button>
                  <Button size="sm" variant="outline" className="flex-none px-2" asChild>
                    <Link to="/dashboard/calculations">Duplicate</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-dashed py-12 text-center bg-slate-50">
            <Calculator className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">No calculations yet</h3>
            <p className="text-muted-foreground mb-6">Start your first solar estimate to see it here.</p>
            <Button variant="solar" asChild>
              <Link to="/">Create New Estimate</Link>
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
