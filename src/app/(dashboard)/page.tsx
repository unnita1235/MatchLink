"use client";

import ProfileCard from "@/components/profile-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { findMatchesAction, type EnrichedMatch } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { user } = useAuth();
  const [matches, setMatches] = useState<EnrichedMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMatches = async () => {
      if (!user) return;

      try {
        setLoading(true);
        // Pass the UID. In a real app, middleware/context handles security, 
        // but passing it to server action works for this hybrid setup too.
        const data = await findMatchesAction(user.uid);
        setMatches(data);
      } catch (error: any) {
        console.error("Error fetching matches:", error);
        toast({
          variant: "destructive",
          title: "Could not load matches",
          description: "Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [user, toast]);

  return (
    <div className="flex flex-col h-full">
      <header className="bg-card border-b p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-headline font-semibold text-primary">
            Discover Profiles
          </h1>
          <p className="text-muted-foreground mt-1">
            Browse and find your potential match.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Input placeholder="Search by name, city, or interest..." className="max-w-xs" />
            <Button variant="outline">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-[250px] w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {matches.length > 0 ? (
                matches.map((match) => (
                  <ProfileCard key={match.profile.id} profile={match.profile} />
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-muted-foreground">
                  No matches found. Try updating your profile or checking back later!
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
