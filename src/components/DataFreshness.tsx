import React from 'react';
import { Calendar } from 'lucide-react';

interface DataFreshnessProps {
  date: string;
  source?: string;
  className?: string;
}

export function DataFreshness({ date, source, className = "" }: DataFreshnessProps) {
  if (!date) return null;

  return (
    <div className={`flex items-center gap-2 text-[10px] text-muted-foreground ${className}`}>
      <Calendar className="w-3 h-3" />
      <span>
        Data last updated: {date}
        {source && ` • Source: ${source}`}
      </span>
    </div>
  );
}
