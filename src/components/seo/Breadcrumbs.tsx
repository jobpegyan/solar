import React from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const location = useLocation();
  
  // Default items based on path if not provided
  const pathItems = React.useMemo(() => {
    if (items) return items;
    
    const parts = location.pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];
    
    let currentPath = "";
    parts.forEach((part) => {
      currentPath += `/${part}`;
      const label = part
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      
      breadcrumbs.push({ label, href: currentPath });
    });
    
    return breadcrumbs;
  }, [items, location.pathname]);

  // Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": pathItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 2, // 1 is home
      "name": item.label,
      "item": `https://solarpanel-calculator.com${item.href}`
    }))
  };

  // Add home to JSON-LD
  jsonLd.itemListElement.unshift({
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://solarpanel-calculator.com"
  });

  return (
    <nav className="flex mb-8 overflow-x-auto pb-2 scrollbar-hide" aria-label="Breadcrumb">
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground whitespace-nowrap">
        <li>
          <Link to="/" className="hover:text-solar flex items-center gap-1 transition-colors">
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {pathItems.map((item, index) => (
          <li key={item.href} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            {index === pathItems.length - 1 ? (
              <span className="font-medium text-foreground" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link to={item.href as any} className="hover:text-solar transition-colors">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
