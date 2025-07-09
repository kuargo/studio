'use server';
/**
 * @fileOverview An AI assistant for writing prayers.
 *
 * - askPrayerAssistant - A function that helps users craft prayers.
 * - PrayerAssistantInput - The input type for the askPrayerAssistant function.
 * - PrayerAssistantOutput - The return type for the askPrayerAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PrayerAssistantInputSchema = z.object({
  topic: z.string().describe("The topic the user wants to pray about."),
});
export type PrayerAssistantInput = z.infer<typeof PrayerAssistantInputSchema>;

const PrayerAssistantOutputSchema = z.object({
    prayer: z.string().describe('The AI-generated prayer.'),
});
export type PrayerAssistantOutput = z.infer<typeof PrayerAssistantOutputSchema>;

export async function askPrayerAssistant(input: PrayerAssistantInput): Promise<PrayerAssistantOutput> {
  return prayerAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'prayerAssistantPrompt',
  input: {schema: PrayerAssistantInputSchema},
  output: {schema: PrayerAssistantOutputSchema},
  prompt: `You are a compassionate and eloquent prayer assistant. Your purpose is to help users articulate their prayers to God.

A user wants to pray about: "{{{topic}}}"

Please write a thoughtful, heartfelt, and encouraging prayer based on their request. The prayer should be personal and reflect a tone of humility, faith, and sincerity. If appropriate, you can gently weave in a relevant scripture theme.`,
});

const prayerAssistantFlow = ai.defineFlow(
  {
    name: 'prayerAssistantFlow',
    inputSchema: PrayerAssistantInputSchema,
    outputSchema: PrayerAssistantOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
