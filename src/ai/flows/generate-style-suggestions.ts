'use server';

/**
 * @fileOverview An AI-powered style quiz for generating personalized interior design style suggestions.
 *
 * - generateStyleSuggestions - A function that takes user preferences and returns style suggestions.
 * - StyleQuizInput - The input type for the generateStyleSuggestions function.
 * - StyleQuizOutput - The return type for the generateStyleSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StyleQuizInputSchema = z.object({
  colorPreferences: z
    .string()
    .describe('The users preferred color palettes, example: pastel colors'),
  materialPreferences: z
    .string()
    .describe('The users preferred materials, example: wood, metal, glass'),
  furnitureStylePreferences: z
    .string()
    .describe(
      'The users preferred furniture styles, example: modern, rustic, minimalist'
    ),
  roomType: z.string().describe('The type of room to be designed, example: living room'),
});

export type StyleQuizInput = z.infer<typeof StyleQuizInputSchema>;

const StyleQuizOutputSchema = z.object({
  styleSuggestions: z.array(z.string()).describe('A list of suggested interior design styles.'),
  designElements: z
    .string()
    .describe(
      'A paragraph describing elements that make up the suggested interior design styles.'
    ),
});

export type StyleQuizOutput = z.infer<typeof StyleQuizOutputSchema>;

export async function generateStyleSuggestions(
  input: StyleQuizInput
): Promise<StyleQuizOutput> {
  return generateStyleSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'styleQuizPrompt',
  input: {schema: StyleQuizInputSchema},
  output: {schema: StyleQuizOutputSchema},
  prompt: `You are an interior design assistant that specializes in suggesting design styles based on user preferences.

  Based on the user's preferences for colors, materials, and furniture styles, generate a list of suggested interior design styles and a paragraph describing the elements that make up the suggested styles for the provided room.

  Color Preferences: {{{colorPreferences}}}
  Material Preferences: {{{materialPreferences}}}
  Furniture Style Preferences: {{{furnitureStylePreferences}}}
  Room Type: {{{roomType}}}
  `,
});

const generateStyleSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateStyleSuggestionsFlow',
    inputSchema: StyleQuizInputSchema,
    outputSchema: StyleQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
