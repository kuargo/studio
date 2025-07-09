
'use server';
/**
 * @fileOverview A Bible chat AI agent.
 *
 * - askBibleAi - A function that handles the Bible chat process.
 * - BibleChatInput - The input type for the askBibleAi function.
 * - BibleChatOutput - The return type for the askBibleAi function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BibleChatInputSchema = z.object({
  question: z.string().describe("The user's question about the Bible."),
});
export type BibleChatInput = z.infer<typeof BibleChatInputSchema>;

const BibleChatOutputSchema = z.object({
    answer: z.string().describe('The AI-generated answer to the user\'s question.'),
});
export type BibleChatOutput = z.infer<typeof BibleChatOutputSchema>;


export async function askBibleAi(input: BibleChatInput): Promise<BibleChatOutput> {
  return bibleChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'bibleChatPrompt',
  input: {schema: BibleChatInputSchema},
  output: {schema: BibleChatOutputSchema},
  prompt: `You are a helpful and wise theological assistant and expert on the Bible. Your purpose is to help users understand scripture better by answering their questions.

Your answers should be clear, encouraging, and based on established biblical knowledge. When relevant, cite specific Bible verses (e.g., John 3:16) to support your answer.

Keep your answers concise and easy to understand for a general audience.

User's Question:
"{{{question}}}"`,
});

const bibleChatFlow = ai.defineFlow(
  {
    name: 'bibleChatFlow',
    inputSchema: BibleChatInputSchema,
    outputSchema: BibleChatOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
