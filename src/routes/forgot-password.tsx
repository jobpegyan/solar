import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Sun } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordComponent,
  head: () => ({
    title: "Forgot Password | Solar Panel Calculator",
    meta: [{ name: "robots", content: "noindex" }],
  }),
});

function ForgotPasswordComponent() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Password reset link sent if account exists");
  };

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
              <Sun className="w-8 h-8 text-solar fill-solar" />
              <span>Solar<span className="text-solar">Panel</span></span>
            </Link>
          </div>
          <CardTitle className="text-2xl">Reset password</CardTitle>
          <CardDescription>Enter your email to receive a reset link</CardDescription>
        </CardHeader>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button variant="solar" className="w-full" type="submit">Send Reset Link</Button>
              <Link to="/login" className="text-sm text-solar hover:underline">
                Back to sign in
              </Link>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="text-center py-6">
            <p className="text-muted-foreground mb-4">
              Check your email for a link to reset your password.
            </p>
            <Button variant="outline" asChild className="w-full">
              <Link to="/login">Return to login</Link>
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
