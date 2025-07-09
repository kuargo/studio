'use server';
/**
 * @fileOverview An AI assistant for generating journal entries.
 *
 * - getJournalSuggestion - A function that helps users write journal entries.
 * - JournalAssistantInput - The input type for the getJournalSuggestion function.
 * - JournalAssistantOutput - The return type for the getJournalSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JournalAssistantInputSchema = z.object({
  topic: z.string().describe("The user's topic or feeling they want to journal about."),
  entryType: z.string().describe("The type of journal entry, e.g., Reflection, Dream, Vision."),
});
export type JournalAssistantInput = z.infer<typeof JournalAssistantInputSchema>;

const JournalAssistantOutputSchema = z.object({
    suggestion: z.string().describe('The AI-generated journal entry suggestion.'),
});
export type JournalAssistantOutput = z.infer<typeof JournalAssistantOutputSchema>;

export async function getJournalSuggestion(input: JournalAssistantInput): Promise<JournalAssistantOutput> {
  return journalAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'journalAssistantPrompt',
  input: {schema: JournalAssistantInputSchema},
  output: {schema: JournalAssistantOutputSchema},
  prompt: `You are a creative, empathetic, and insightful journal assistant. Your purpose is to help users reflect on their experiences and connect with their faith.

A user wants to write a '{{{entryType}}}' entry about the following topic: "{{{topic}}}"

Based on this, provide a thoughtful and reflective starting point. You can ask probing questions, offer a related scripture, or provide a short, reflective paragraph to get them started. Frame your response in a way that encourages deep and honest self-examination.

Your response should be a guide, not a complete entry.`,
});

const journalAssistantFlow = ai.defineFlow(
  {
    name: 'journalAssistantFlow',
    inputSchema: JournalAssistantInputSchema,
    outputSchema: JournalAssistantOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
