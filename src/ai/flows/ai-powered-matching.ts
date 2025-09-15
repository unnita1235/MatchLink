'use server';

/**
 * @fileOverview Implements the AI-powered matching flow to suggest potential matches based on user profile data and preferences.
 *
 * - aiPoweredMatching - A function that suggests potential matches.
 * - AIPoweredMatchingInput - The input type for the aiPoweredMatching function.
 * - AIPoweredMatchingOutput - The return type for the aiPoweredMatching function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPoweredMatchingInputSchema = z.object({
  userProfile: z.string().describe('The user profile data, including personal information and preferences.'),
  otherProfiles: z.string().describe('Other member profiles to compare against the user profile.'),
});
export type AIPoweredMatchingInput = z.infer<typeof AIPoweredMatchingInputSchema>;

const AIPoweredMatchingOutputSchema = z.object({
  suggestedMatches: z.array(
    z.object({
      profileId: z.string().describe('The ID of the suggested match profile.'),
      compatibilityScore: z.number().describe('A score indicating the compatibility between the user and the suggested match.'),
      reasoning: z.string().describe('Explanation of why the profile is a good match, based on profile data and preferences.'),
    })
  ).describe('A list of suggested matches with compatibility scores and reasoning.'),
});
export type AIPoweredMatchingOutput = z.infer<typeof AIPoweredMatchingOutputSchema>;

export async function aiPoweredMatching(input: AIPoweredMatchingInput): Promise<AIPoweredMatchingOutput> {
  return aiPoweredMatchingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredMatchingPrompt',
  input: {schema: AIPoweredMatchingInputSchema},
  output: {schema: AIPoweredMatchingOutputSchema},
  prompt: `You are an AI matchmaker. You will be provided with a user profile and a list of other member profiles.  You will compare the user profile against each of the other member profiles, determine a compatibility score (0-100), and provide reasoning for why the profile is a good match based on profile data and preferences.

User Profile:
{{{userProfile}}}

Other Member Profiles:
{{{otherProfiles}}}

Output a JSON array of suggested matches, with profile IDs, compatibility scores, and reasoning for each match.
`, 
});

const aiPoweredMatchingFlow = ai.defineFlow(
  {
    name: 'aiPoweredMatchingFlow',
    inputSchema: AIPoweredMatchingInputSchema,
    outputSchema: AIPoweredMatchingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
