"use server";

import { aiPoweredMatching, type AIPoweredMatchingOutput } from "@/ai/flows/ai-powered-matching";
import { profiles } from "@/lib/data";
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

export async function findMatchesAction(userId: string): Promise<AIPoweredMatchingOutput> {
  try {
    const currentUser = profiles.find((p) => p.id === userId);
    const otherUsers = profiles.filter((p) => p.id !== userId);

    if (!currentUser) {
      throw new Error("User not found");
    }

    const userProfileString = profileToString(currentUser);
    const otherProfilesString = otherUsers.map(profileToString).join("\n---\n");

    const result = await aiPoweredMatching({
      userProfile: userProfileString,
      otherProfiles: otherProfilesString,
    });

    return result;

  } catch (error) {
    console.error("Error in findMatchesAction:", error);
    // Return a structured error or re-throw
    throw new Error("Failed to get AI-powered matches. Please try again later.");
  }
}
