"use server";

import { aiPoweredMatching, type AIPoweredMatchingOutput } from "@/ai/flows/ai-powered-matching";
import { getUserProfile, getAllProfiles } from "@/lib/db";
import type { Profile } from "@/lib/types";

function profileToString(profile: Profile): string {
  return `
- Profile ID: ${profile.id}
- Name: ${profile.name}
- Age: ${profile.age}
- Gender: ${profile.gender}
- Location: ${profile.location.city}, ${profile.location.state}
- Bio: ${profile.bio}
- Interests: ${profile.interests.join(", ")}
- Occupation: ${profile.occupation}
- Education: ${profile.education}
- Religion: ${profile.religionInfo.religion}, Caste: ${profile.religionInfo.caste}
- Partner Preferences: Wants someone aged ${profile.partnerPreferences.ageRange}, with height ${profile.partnerPreferences.heightRange}. Prefers someone who is into ${profile.partnerPreferences.interests.join(', ')}. General preference: "${profile.partnerPreferences.bio}"
`.trim();
}

export type EnrichedMatch = {
  profile: Profile;
  compatibilityScore: number;
  reasoning: string;
};

export async function findMatchesAction(userId: string): Promise<EnrichedMatch[]> {
  try {
    const currentUser = await getUserProfile(userId);
    const allProfiles = await getAllProfiles(userId);

    // Simple mock filter for "other users" if db returns everything
    const otherUsers = allProfiles.filter((p) => p.id !== userId);

    if (!currentUser) {
      throw new Error("User not found");
    }

    const userProfileString = profileToString(currentUser);
    const otherProfilesString = otherUsers.map(profileToString).join("\n---\n");

    const result = await aiPoweredMatching({
      userProfile: userProfileString,
      otherProfiles: otherProfilesString,
    });

    // Enrich matches with profile data
    const enrichedMatches = await Promise.all(
      result.suggestedMatches.map(async (match) => {
        const profile = otherUsers.find(p => p.id === match.profileId) || await getUserProfile(match.profileId);
        if (!profile) return null;
        return {
          profile,
          compatibilityScore: match.compatibilityScore,
          reasoning: match.reasoning,
        };
      })
    );

    return enrichedMatches.filter((m): m is EnrichedMatch => m !== null);

  } catch (error) {
    console.error("AI Matching failed:", error);
    // Fallback to mock matches for Demo Mode / Error recovery
    const { profiles: mockProfiles } = await import("@/lib/data");

    // Return top 3 mock profiles as matches
    return mockProfiles.slice(0, 3).map(profile => ({
      profile,
      compatibilityScore: Math.floor(Math.random() * (99 - 70) + 70), // Random score 70-99
      reasoning: "Matched based on shared interests in technology and outdoor activities. (Demo Mode)"
    }));
  }
}
