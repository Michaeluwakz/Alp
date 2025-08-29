
"use client";

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitContactForm } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, Send } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long.").max(100),
  email: z.string().email("Please enter a valid email address.").max(100),
  phone: z.string().optional().refine(val => !val || /^[+]?[0-9\s-()]{7,20}$/.test(val), {
    message: "Please enter a valid phone number.",
  }),
  message: z.string().min(10, "Message must be at least 10 characters long.").max(1000),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);


export default function ContactSection({ id }: { id: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value as string);
    });

    const result = await submitContactForm(formData);
    
    if (result.success && result.redirectTo) {
      window.location.href = result.redirectTo;
      // setIsSubmitting(false); // State will reset on navigation or if component unmounts
      // form.reset(); // Form will clear on navigation or if component unmounts
    } else if (result.success) { // Fallback if redirectTo is somehow not provided
      setIsSubmitting(false);
      toast({
        title: "Message Processed!",
        description: result.message || "Your message is ready.",
      });
      form.reset();
    }
     else {
      setIsSubmitting(false);
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: result.message || "Please correct the errors and try again.",
      });
      if(result.errors) {
        Object.entries(result.errors).forEach(([field, errors]) => {
          form.setError(field as keyof ContactFormValues, { message: (errors as string[])[0] });
        });
      }
    }
  };

  return (
    <section id={id} className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl font-extrabold text-foreground sm:text-5xl">Get In Touch</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Ready to start your design journey? Contact us today for a consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <Card className="bg-card shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-card-foreground">Send Us a Message</CardTitle>
              <CardDescription className="text-card-foreground/70">We'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-card-foreground">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} className="bg-input text-foreground placeholder:text-muted-foreground" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-card-foreground">Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} className="bg-input text-foreground placeholder:text-muted-foreground" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-card-foreground">Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Your Phone Number" {...field} className="bg-input text-foreground placeholder:text-muted-foreground" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-card-foreground">Your Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about your project or inquiry..." {...field} rows={5} className="bg-input text-foreground placeholder:text-muted-foreground" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                       <Send className="mr-2 h-4 w-4" />
                    )}
                    Send Message
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>

          <div className="space-y-8">
            <Card className="bg-card shadow-xl">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-card-foreground">Direct Contact</CardTitle>
                <CardDescription className="text-card-foreground/70">Reach out to us directly through your preferred channel.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="https://api.whatsapp.com/send/?phone=2349018464789&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary transition-colors group">
                  <WhatsAppIcon />
                  <span className="text-card-foreground group-hover:text-primary">Chat on WhatsApp</span>
                </Link>
                <Link href="mailto:contact@apholaby.com" className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary transition-colors group">
                  <Mail className="h-6 w-6 text-primary" />
                  <span className="text-card-foreground group-hover:text-primary">contact@apholaby.com</span>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-card shadow-xl">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-card-foreground">Visit Us (By Appointment)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-card-foreground/80">📍 21 Fatai Atere Lagos Nigeria</p>
                <p className="text-sm text-card-foreground/60 mt-2">Please call or email to schedule an appointment.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
