
"use server";

import { z } from "zod";
import { generateStyleSuggestions as genStyleSuggestionsFlow, type StyleQuizInput, type StyleQuizOutput } from '@/ai/flows/generate-style-suggestions';

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

const WHATSAPP_PHONE_NUMBER = "2349018464789"; // Cleaned number: +234 901 846 4789

export async function submitContactForm(formData: FormData): Promise<{ success: boolean; errors?: any; message?: string; redirectTo?: string }> {
  const rawFormData = Object.fromEntries(formData.entries());
  const parsed = contactFormSchema.safeParse(rawFormData);

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const { name, email, phone, message: userMessage } = parsed.data;

  const prefilledMessage = `New Inquiry from Apholaby Website:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nMessage: ${userMessage}`;
  const encodedMessage = encodeURIComponent(prefilledMessage);
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE_NUMBER}&text=${encodedMessage}`;

  return { success: true, redirectTo: whatsappUrl };
}


const styleQuizFormSchema = z.object({
  colorPreferences: z.string().min(3, "Please describe your color preferences."),
  materialPreferences: z.string().min(3, "Please describe your material preferences."),
  furnitureStylePreferences: z.string().min(3, "Please describe your furniture style preferences."),
  roomType: z.string().min(3, "Please specify the room type."),
});

export async function generateStyleSuggestions(formData: FormData): Promise<{ success: boolean; data?: StyleQuizOutput; errors?: any; message?: string }> {
  const rawFormData = Object.fromEntries(formData.entries());
  const parsed = styleQuizFormSchema.safeParse(rawFormData);

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  try {
    const input: StyleQuizInput = parsed.data;
    const result = await genStyleSuggestionsFlow(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error generating style suggestions:", error);
    return { success: false, message: "An error occurred while generating style suggestions. Please try again." };
  }
}
