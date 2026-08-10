import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { getNavCategoryGroups } from "@/calculators/navigation";


const legalLinks = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Use", href: "/terms" },
  { name: "Disclaimer", href: "/disclaimer" },
  { name: "Cookie Policy", href: "/cookie-policy" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-slate-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-xl">☀️</span>
              <span className="text-lg font-bold tracking-tight text-foreground">
                Solar Panel Calculator
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Helping homeowners transition to renewable energy with data-driven insights and easy-to-use calculators.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Solar Calculators</h3>
            <ul className="space-y-2">
              {getNavCategoryGroups().map((group) => (
                <li key={group.category.slug}>
                  <Link
                    to="/calculators/$category"
                    params={{ category: group.category.slug }}
                    className="text-sm text-muted-foreground hover:text-solar transition-colors"
                  >
                    {group.category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/calculators"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-solar hover:underline"
                >
                  View All Calculators <ArrowRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/guides" className="text-sm text-muted-foreground hover:text-solar">Solar Guides</Link></li>
              <li><Link to="/countries" className="text-sm text-muted-foreground hover:text-solar">Country Solar Calculators</Link></li>
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-solar">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-solar">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href as any}
                    className="text-sm text-muted-foreground hover:text-solar transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>

              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} solarpanel-calculator.com. All rights reserved. 
            Estimates only. Please consult a professional before installation.
          </p>
        </div>
      </div>
    </footer>
  );
}
