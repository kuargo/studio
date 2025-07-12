
'use server';
/**
 * @fileOverview A Bible chat AI agent with a tool to look up scripture.
 *
 * - askBibleAi - A function that handles the Bible chat process.
 * - BibleChatInput - The input type for the askBibleAi function.
 * - BibleChatOutput - The return type for the askBibleAi function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { lookupScripture } from '@/services/bible';

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

const scriptureLookupTool = ai.defineTool(
    {
        name: 'lookupScripture',
        description: 'Looks up the text of a specific Bible verse or passage.',
        inputSchema: z.object({
            passage: z.string().describe('The Bible passage to look up, e.g., "John 3:16" or "Romans 12:1-2".'),
        }),
        outputSchema: z.string(),
    },
    async (input) => lookupScripture(input.passage)
);

const prompt = ai.definePrompt({
  name: 'bibleChatPrompt',
  input: {schema: BibleChatInputSchema},
  output: {schema: BibleChatOutputSchema},
  tools: [scriptureLookupTool],
  prompt: `You are a helpful and wise theological assistant and expert on the Bible. Your purpose is to help users understand scripture better by answering their questions.

Your answers should be clear, encouraging, and based on established biblical knowledge. 

If a user asks about a specific Bible verse or passage, you MUST use the provided 'lookupScripture' tool to retrieve the exact text first. Then, use that text to inform your explanation. When relevant, cite specific Bible verses (e.g., John 3:16) to support your answer.

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
