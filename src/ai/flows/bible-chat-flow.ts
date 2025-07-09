
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
  question: z.string().describe('The user\'s question about the biblical text.'),
  context: z.string().describe('The biblical text to use as context for answering the question.'),
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
  prompt: `You are a helpful and wise theological assistant. Your purpose is to help users understand scripture better.

Answer the user's question based *only* on the provided biblical text context. Do not use outside knowledge or other parts of the Bible unless the provided text directly references them.

If the answer is not in the text, politely state that the provided passage does not contain the answer. Do not invent information. Be encouraging and clear in your explanation.

Provided Biblical Text:
---
{{{context}}}
---

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
