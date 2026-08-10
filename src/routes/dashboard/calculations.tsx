import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getSavedCalculations, deleteCalculation, toggleFavorite } from "@/lib/user.functions";
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal, Search, Star, Trash2, Copy, FileText, Share2, Filter } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/calculations")({
  component: CalculationsPage,
  head: () => ({
    title: "Saved Calculations | Solar Panel Calculator",
    meta: [{ name: "robots", content: "noindex" }],
  }),
});

function CalculationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const { data: calculations = [] } = useSuspenseQuery({
    queryKey: ['savedCalculations'],
    queryFn: () => getSavedCalculations()
  });

  const deleteMutation = useMutation({
    mutationFn: (data: { id: string }) => deleteCalculation({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedCalculations'] });
      toast.success("Calculation deleted");
    }
  });

  const favoriteMutation = useMutation({
    mutationFn: (data: { id: string, is_favorite: boolean }) => toggleFavorite({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedCalculations'] });
    }
  });

  const filteredCalculations = calculations.filter(calc => 
    calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    calc.calculator_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-12 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Saved Calculations</h1>
          <p className="text-muted-foreground text-lg">Access and manage your solar estimates.</p>
        </div>
      </div>

      <Card className="mb-8">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name or calculator type..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </CardContent>
      </Card>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30px]"></TableHead>
              <TableHead>Calculation Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size (kW)</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCalculations.length > 0 ? (
              filteredCalculations.map((calc) => (
                <TableRow key={calc.id}>
                  <TableCell>
                    <button 
                      onClick={() => favoriteMutation.mutate({ id: calc.id, is_favorite: !calc.is_favorite })}
                      className="focus:outline-none"
                    >
                      <Star className={`w-4 h-4 ${calc.is_favorite ? "text-solar fill-solar" : "text-muted-foreground"}`} />
                    </button>
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link to="/dashboard/report/$id" params={{ id: calc.id }} className="hover:text-solar underline-offset-4 hover:underline">
                      {calc.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground capitalize">
                    {calc.calculator_type.replace(/-/g, ' ')}
                  </TableCell>
                  <TableCell>{calc.system_size_kw} kW</TableCell>
                  <TableCell>{new Date(calc.updated_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem asChild>
                          <Link to="/dashboard/report/$id" params={{ id: calc.id }} className="cursor-pointer">
                            <FileText className="w-4 h-4 mr-2" />
                            View Result
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/dashboard/compare" className="cursor-pointer">
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share Link
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive cursor-pointer"
                          onClick={() => {
                            if (confirm("Delete this saved estimate?")) {
                              deleteMutation.mutate({ id: calc.id });
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No calculations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
