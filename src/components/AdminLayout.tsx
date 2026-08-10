import React from 'react';
import { Link, Outlet } from '@tanstack/react-router';
import { 
  Globe, 
  Map, 
  Sun, 
  Zap, 
  DollarSign, 
  FileText, 
  Settings, 
  MapPin, 
  LayoutDashboard,
  LogOut,
  HelpCircle,
  TrendingUp,
  Users,
  Landmark,
  Building2,
  CheckCircle2,
  Gauge,
  Calculator,
  Layers,
  RefreshCw,
  BookOpen,
  CreditCard
 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const sidebarLinks = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Analytics', href: '/admin/analytics', icon: TrendingUp },
  { name: 'Monetization', href: '/admin/monetization', icon: CreditCard },
  { name: 'Leads', href: '/admin/leads', icon: Users },
  { name: 'Calculators', href: '/admin/calculators', icon: Calculator },
  { name: 'Categories', href: '/admin/categories', icon: Layers },
  { name: 'Redirects', href: '/admin/redirects', icon: RefreshCw },
  { name: 'Countries', href: '/admin/countries', icon: Globe },
  { name: 'Regions', href: '/admin/regions', icon: Map },
  { name: 'Locations', href: '/admin/locations', icon: MapPin },
  { name: 'Solar Data', href: '/admin/solar-resource', icon: Sun },
  { name: 'Utility Rates', href: '/admin/utility-rates', icon: Zap },
  { name: 'Incentives', href: '/admin/incentives', icon: Landmark },
  { name: 'Pricing', href: '/admin/solar-pricing', icon: DollarSign },
  { name: 'Settings', href: '/admin/calculator-settings', icon: Settings },
  { name: 'Guides', href: '/admin/guides', icon: BookOpen },
  { name: 'Content', href: '/admin/content', icon: FileText },
  { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
  { name: 'Commercial', href: '/admin/commercial', icon: Building2 },
  { name: 'Production Audit', href: '/admin/audit', icon: CheckCircle2 },
  { name: 'Performance', href: '/admin/performance', icon: Gauge },
];

export function AdminLayout() {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) toast.error('Error logging out');
    else window.location.href = '/admin/login';
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed inset-y-0 z-50">
        <div className="p-6 flex items-center gap-2 border-b border-slate-800">
          <div className="bg-solar p-1 rounded text-slate-900">☀️</div>
          <span className="font-bold text-white tracking-tight">Solar Admin</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              activeProps={{ className: "bg-slate-800 text-white" }}
              inactiveProps={{ className: "hover:bg-slate-800/50 hover:text-white" }}
              className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium"
            >
              <link.icon className="h-4 w-4" />
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800 px-3"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pl-64">
        <div className="p-8 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
