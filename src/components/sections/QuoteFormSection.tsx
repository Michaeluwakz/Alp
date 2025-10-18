"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send } from 'lucide-react';

const quoteFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(100, "Name is too long."),
  projectType: z.string().min(1, "Please select a project type."),
  email: z.string().email("Please enter a valid email address."),
  telephone: z.string().min(10, "Please enter a valid phone number.").max(20, "Phone number is too long."),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

const projectTypeOptions = [
  { value: 'home', label: 'Home' },
  { value: 'office', label: 'Office' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'interior', label: 'Interior' },
  { value: 'exterior', label: 'Exterior' },
  { value: 'renovation', label: 'Renovation' },
];

export default function QuoteFormSection({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: '',
      projectType: '',
      email: '',
      telephone: '',
    },
  });

  const onSubmit: SubmitHandler<QuoteFormValues> = async (data) => {
    setIsLoading(true);

    try {
      // Format the project type for display
      const projectTypeLabel = projectTypeOptions.find(option => option.value === data.projectType)?.label || data.projectType;
      
      // Create the WhatsApp message
      const message = `🏠 *New Quote Request from Apholaby Enterprises Ltd Website*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.telephone}
🏗️ *Project Type:* ${projectTypeLabel}

I'm interested in getting a quote for my project. Please contact me to discuss the details and provide a personalized quote.

Thank you!`;

      // Encode the message for URL
      const encodedMessage = encodeURIComponent(message);
      
      // WhatsApp phone number
      const whatsappNumber = "2348118171689";
      
      // Create WhatsApp URL
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Quote Request Sent!",
        description: "Your quote request has been sent to WhatsApp. We'll get back to you soon!",
      });
      
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send your quote request. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id={id} className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl font-extrabold text-foreground sm:text-5xl">Get Your Free Quote</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Ready to transform your space? Fill out the form below and we'll provide you with a personalized quote for your project.
          </p>
        </div>

        <div className="flex justify-center">
          <Card className="bg-card shadow-xl w-full max-w-md">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-card-foreground">Request a Quote</CardTitle>
              <CardDescription className="text-card-foreground/70">
                Tell us about your project and we'll get back to you with a detailed quote.
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-card-foreground">Full Name *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your full name" 
                            {...field} 
                            className="bg-input text-foreground placeholder:text-muted-foreground" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-card-foreground">Project Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-input text-foreground">
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {projectTypeOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-card-foreground">Email Address *</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="Enter your email address" 
                            {...field} 
                            className="bg-input text-foreground placeholder:text-muted-foreground" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="telephone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-card-foreground">Phone Number *</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel"
                            placeholder="Enter your phone number" 
                            {...field} 
                            className="bg-input text-foreground placeholder:text-muted-foreground" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                
                <div className="p-6 pt-0">
                  <Button 
                    type="submit" 
                    disabled={isLoading} 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
                    Send Quote Request to WhatsApp
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </section>
  );
}
