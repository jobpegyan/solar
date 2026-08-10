export function Disclaimer({ context }: { context: string }) {
  return (
    <div className="mt-8 border-t pt-8">
      <p className="text-xs text-muted-foreground italic">
        <strong>Important:</strong> Solar calculations shown for {context} are estimates intended for planning and educational purposes. 
        Actual solar production, installation costs, electricity savings and payback periods can vary based on location, weather, shading, roof orientation, equipment, electricity rates, installation quality, maintenance and other factors.
        For cost and subsidy information, users should verify current local pricing and applicable programs before making a purchase decision.
      </p>
    </div>
  );
}
