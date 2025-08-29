
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateStyleSuggestions } from '@/app/actions';
import type { StyleQuizOutput } from '@/ai/flows/generate-style-suggestions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2 } from 'lucide-react';

const styleQuizFormSchema = z.object({
  colorPreferences: z.string().min(3, "Color preferences are too short.").max(200, "Too long."),
  materialPreferences: z.string().min(3, "Material preferences are too short.").max(200, "Too long."),
  furnitureStylePreferences: z.string().min(3, "Furniture style preferences are too short.").max(200, "Too long."),
  roomType: z.string().min(3, "Room type is too short.").max(100, "Too long."),
});

type StyleQuizFormValues = z.infer<typeof styleQuizFormSchema>;

export default function StyleQuizSection({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [quizResult, setQuizResult] = useState<StyleQuizOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<StyleQuizFormValues>({
    resolver: zodResolver(styleQuizFormSchema),
    defaultValues: {
      colorPreferences: '',
      materialPreferences: '',
      furnitureStylePreferences: '',
      roomType: '',
    },
  });

  const onSubmit: SubmitHandler<StyleQuizFormValues> = async (data) => {
    setIsLoading(true);
    setQuizResult(null);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const result = await generateStyleSuggestions(formData);

    setIsLoading(false);
    if (result.success && result.data) {
      setQuizResult(result.data);
      toast({
        title: "Style Quiz Results",
        description: "Your personalized style suggestions are ready!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Quiz Error",
        description: result.message || "Failed to get style suggestions. Please try again.",
      });
    }
  };

  const showTwoColumns = isLoading || (quizResult && !isLoading);
  const gridLayoutClass = showTwoColumns ? 'md:grid-cols-2' : 'md:grid-cols-1 md:justify-items-center';

  return (
    <section id={id} className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl font-extrabold text-foreground sm:text-5xl">Discover Your Style</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Answer a few questions and let our AI help you find the perfect interior design style for your space.
          </p>
        </div>

        <div className={`grid grid-cols-1 ${gridLayoutClass} gap-12 items-start`}>
          <Card className="bg-card shadow-xl w-full max-w-xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-card-foreground">Style Preferences Quiz</CardTitle>
              <CardDescription className="text-card-foreground/70">Tell us about your tastes.</CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="colorPreferences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-card-foreground">Preferred Colors/Palettes?</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Warm neutrals, bold jewel tones, pastels" {...field} className="bg-input text-foreground placeholder:text-muted-foreground" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="materialPreferences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-card-foreground">Preferred Materials?</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Natural wood, sleek metal, plush velvet" {...field} className="bg-input text-foreground placeholder:text-muted-foreground" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="furnitureStylePreferences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-card-foreground">Preferred Furniture Styles?</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Modern, minimalist, rustic, bohemian" {...field} className="bg-input text-foreground placeholder:text-muted-foreground" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="roomType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-card-foreground">Type of Room?</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Living room, bedroom, home office" {...field} className="bg-input text-foreground placeholder:text-muted-foreground" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Wand2 className="mr-2 h-4 w-4" />
                    )}
                    Get Style Suggestions
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>

          {isLoading && (
            <div className="flex flex-col items-center justify-center space-y-4 p-8 min-h-[300px] w-full max-w-xl">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-lg text-foreground/80">Generating your style profile...</p>
            </div>
          )}

          {quizResult && !isLoading && (
            <Card className="bg-card shadow-xl w-full max-w-xl">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-card-foreground">Your Style DNA</CardTitle>
                <CardDescription className="text-card-foreground/70">Here are some styles that might suit you:</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg text-primary mb-2">Suggested Styles:</h4>
                  <ul className="list-disc list-inside space-y-1 text-card-foreground/90">
                    {quizResult.styleSuggestions.map((style, index) => (
                      <li key={index}>{style}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-primary mb-2">Key Design Elements:</h4>
                  <p className="text-card-foreground/90">{quizResult.designElements}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => { setQuizResult(null); form.reset(); }} variant="outline" className="w-full text-accent border-accent hover:bg-accent hover:text-accent-foreground">
                  Start a New Quiz
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
