"use client";

import { useState } from "react";
import { findMatchesAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { profiles } from "@/lib/data";
import { Bot, Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import Watermark from "@/components/watermark";

import type { EnrichedMatch } from "@/app/actions";

export default function MatchPage() {
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [matches, setMatches] = useState<EnrichedMatch[] | null>(null);
  const { toast } = useToast();

  const handleFindMatches = async () => {
    if (!selectedUserId) {
      toast({
        title: "No User Selected",
        description: "Please select a user to find matches for.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setMatches(null);
    try {
      const result = await findMatchesAction(selectedUserId);
      setMatches(result);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error Finding Matches",
        description:
          error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedUserProfile = profiles.find(p => p.id === selectedUserId);

  return (
    <div className="flex flex-col h-full">
      <header className="bg-card border-b p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-headline font-semibold text-primary flex items-center gap-2">
            <Bot />
            AI Smart Matching
          </h1>
          <p className="text-muted-foreground mt-1">
            Let our AI find the most compatible matches for a user.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
            <Select onValueChange={setSelectedUserId} value={selectedUserId}>
              <SelectTrigger className="w-full sm:w-[280px]">
                <SelectValue placeholder="Select a user profile..." />
              </SelectTrigger>
              <SelectContent>
                {profiles.map((profile) => (
                  <SelectItem key={profile.id} value={profile.id}>
                    {profile.name} ({profile.age}, {profile.location.city})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleFindMatches}
              disabled={isLoading || !selectedUserId}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Find AI Matches
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          {!matches && !isLoading && (
            <div className="text-center py-20">
              <div className="inline-block bg-primary/10 p-4 rounded-full">
                <Bot className="w-12 h-12 text-primary" />
              </div>
              <h2 className="mt-4 text-xl font-semibold font-headline">Ready to Find Matches?</h2>
              <p className="text-muted-foreground mt-2">
                Select a user from the dropdown above and click &quot;Find AI Matches&quot; to start.
              </p>
            </div>
          )}

          {isLoading && (
            <div className="text-center py-20">
              <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
              <h2 className="mt-4 text-xl font-semibold font-headline">Finding Matches...</h2>
              <p className="text-muted-foreground mt-2">
                Our AI is analyzing profiles to find the best connections for {selectedUserProfile?.name}.
              </p>
            </div>
          )}

          {matches && (
            <div>
              <h2 className="text-2xl font-headline font-semibold mb-4">
                Top Matches for {selectedUserProfile?.name}
              </h2>
              <div className="space-y-6">
                {matches.sort((a, b) => b.compatibilityScore - a.compatibilityScore).map((match) => {
                  const matchedProfile = match.profile;
                  if (!matchedProfile) return null;
                  return (
                    <Card key={matchedProfile.id} className="overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="md:col-span-1 relative">
                          <Image
                            src={matchedProfile.photos[0].url}
                            alt={matchedProfile.name}
                            width={400}
                            height={400}
                            className="object-cover w-full h-full min-h-[200px]"
                            data-ai-hint={matchedProfile.photos[0].hint}
                          />
                          <Watermark />
                        </div>
                        <div className="md:col-span-2">
                          <CardHeader>
                            <CardTitle className="text-xl font-headline">
                              <Link href={`/profile/${matchedProfile.id}`} className="hover:underline text-primary">
                                {matchedProfile.name}, {matchedProfile.age}
                              </Link>
                            </CardTitle>
                            <CardDescription>
                              {matchedProfile.occupation} from {matchedProfile.location.city}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-primary">Compatibility Score</span>
                                <span className="text-sm font-bold text-primary">{match.compatibilityScore}%</span>
                              </div>
                              <Progress value={match.compatibilityScore} className="h-2" />
                            </div>
                            <Accordion type="single" collapsible className="w-full mt-4">
                              <AccordionItem value="item-1">
                                <AccordionTrigger>Why it&apos;s a match</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                  {match.reasoning}
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </CardContent>
                          <CardFooter>
                            <Button asChild size="sm">
                              <Link href={`/profile/${matchedProfile.id}`}>View Full Profile</Link>
                            </Button>
                          </CardFooter>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
