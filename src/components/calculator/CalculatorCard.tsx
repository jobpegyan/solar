import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { CalculatorDefinition } from '@/calculators/types';
import * as Icons from 'lucide-react';

interface CalculatorCardProps {
  calculator: CalculatorDefinition;
}

export function CalculatorCard({ calculator }: CalculatorCardProps) {
  const IconComponent = (Icons as any)[calculator.icon] || Icons.Calculator;

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border-border/60 hover:border-solar/40 group">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-solar/10 rounded-lg text-solar group-hover:bg-solar group-hover:text-white transition-colors">
            <IconComponent className="w-5 h-5" />
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-0.5 bg-secondary rounded-full">
            {calculator.category.replace('-', ' ')}
          </div>
        </div>
        <CardTitle className="text-xl group-hover:text-solar transition-colors">{calculator.name}</CardTitle>
        <CardDescription className="line-clamp-2 mt-2">
          {calculator.shortDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Additional metadata could go here */}
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild className="w-full group/btn" variant="outline">
          <Link to={calculator.slug as any}>
            Calculate Now
            <Icons.ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
