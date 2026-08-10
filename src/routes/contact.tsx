import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export const Route = createFileRoute('/contact')({
  head: () => ({
    title: 'Contact Us | SolarPanelCalculator',
    meta: [
      {
        name: 'description',
        content: 'Get in touch with SolarPanelCalculator for support, feedback, or privacy-related inquiries.',
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you for your message. We will get back to you soon!');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumbs />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions about your solar calculations or need to reach out regarding your privacy? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What is this about?" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us how we can help..." 
                      className="min-h-[150px]"
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-solar hover:bg-solar/90 text-white">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/privacy-policy" className="block text-primary hover:underline text-sm">Privacy Policy</Link>
                <Link to="/terms" className="block text-primary hover:underline text-sm">Terms of Use</Link>
                <Link to="/disclaimer" className="block text-primary hover:underline text-sm">Disclaimer</Link>
                <Link to="/cookie-policy" className="block text-primary hover:underline text-sm">Cookie Policy</Link>
              </CardContent>
            </Card>
            
            <Card className="bg-solar/5 border-solar/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Privacy Requests</h3>
                <p className="text-sm text-muted-foreground">
                  If you are reaching out regarding data access, deletion, or other privacy rights, please specify "Privacy Request" in the subject line.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
