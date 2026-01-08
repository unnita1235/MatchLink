"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, X, Star, Sparkles, MapPin, Briefcase, GraduationCap, RotateCcw, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { getAllProfiles } from "@/lib/db";
import type { Profile } from "@/lib/types";
import { profiles as mockProfiles } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function DiscoverPage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [actionHistory, setActionHistory] = useState<{ index: number; action: string }[]>([]);
    const [showMatchDialog, setShowMatchDialog] = useState(false);
    const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);

    useEffect(() => {
        const loadProfiles = async () => {
            try {
                // Try to load from Firestore first, fallback to mock data
                let loadedProfiles: Profile[] = [];
                try {
                    loadedProfiles = await getAllProfiles(user?.uid);
                } catch {
                    loadedProfiles = mockProfiles;
                }

                if (loadedProfiles.length === 0) {
                    loadedProfiles = mockProfiles;
                }

                setProfiles(loadedProfiles);
            } catch (error) {
                setProfiles(mockProfiles);
            } finally {
                setLoading(false);
            }
        };

        loadProfiles();
    }, [user]);

    const currentProfile = profiles[currentIndex];

    const handleLike = () => {
        if (!currentProfile) return;

        setActionHistory((prev) => [...prev, { index: currentIndex, action: "like" }]);

        // Simulate match (30% chance)
        if (Math.random() < 0.3) {
            setMatchedProfile(currentProfile);
            setShowMatchDialog(true);
        } else {
            toast({
                title: "Interest Sent! 💕",
                description: `You expressed interest in ${currentProfile.name}.`,
            });
        }

        setCurrentIndex((prev) => prev + 1);
    };

    const handlePass = () => {
        if (!currentProfile) return;
        setActionHistory((prev) => [...prev, { index: currentIndex, action: "pass" }]);
        setCurrentIndex((prev) => prev + 1);
    };

    const handleSuperLike = () => {
        if (!currentProfile) return;
        setActionHistory((prev) => [...prev, { index: currentIndex, action: "superlike" }]);

        toast({
            title: "Super Like Sent! ⭐",
            description: `${currentProfile.name} will be notified of your interest!`,
        });

        setCurrentIndex((prev) => prev + 1);
    };

    const handleUndo = () => {
        if (actionHistory.length === 0) return;

        const lastAction = actionHistory[actionHistory.length - 1];
        setActionHistory((prev) => prev.slice(0, -1));
        setCurrentIndex(lastAction.index);

        toast({
            title: "Action Undone",
            description: "You can swipe again.",
        });
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    if (currentIndex >= profiles.length) {
        return (
            <div className="flex flex-col h-full">
                <header className="bg-card border-b p-4">
                    <div className="max-w-lg mx-auto">
                        <h1 className="text-2xl font-headline font-semibold text-primary flex items-center gap-2">
                            <Sparkles className="h-6 w-6" />
                            Discover
                        </h1>
                        <p className="text-muted-foreground mt-1">Find your perfect match</p>
                    </div>
                </header>
                <main className="flex-1 flex items-center justify-center p-4">
                    <div className="text-center">
                        <Heart className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold mb-2">No More Profiles</h2>
                        <p className="text-muted-foreground mb-4">
                            You&apos;ve seen all available profiles. Check back later for new matches!
                        </p>
                        <Button onClick={() => setCurrentIndex(0)}>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Start Over
                        </Button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <header className="bg-card border-b p-4">
                <div className="max-w-lg mx-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-headline font-semibold text-primary flex items-center gap-2">
                                <Sparkles className="h-6 w-6" />
                                Discover
                            </h1>
                            <p className="text-muted-foreground mt-1">Find your perfect match</p>
                        </div>
                        <Badge variant="secondary">
                            {profiles.length - currentIndex} profiles left
                        </Badge>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center p-4 overflow-hidden">
                <div className="w-full max-w-md">
                    {/* Profile Card */}
                    <Card className="overflow-hidden shadow-xl">
                        <div className="relative aspect-[3/4]">
                            <Image
                                src={currentProfile.photos[0]?.url || "https://picsum.photos/400/500"}
                                alt={currentProfile.name}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Profile Info Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h2 className="text-2xl font-bold">
                                            {currentProfile.name}, {currentProfile.age}
                                        </h2>
                                        <div className="flex items-center gap-2 text-white/90 text-sm">
                                            <MapPin className="h-4 w-4" />
                                            {currentProfile.location.city}, {currentProfile.location.state}
                                        </div>
                                    </div>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                                                <Info className="h-5 w-5" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle className="text-xl">{currentProfile.name}, {currentProfile.age}</DialogTitle>
                                                <DialogDescription>{currentProfile.occupation}</DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4 mt-4">
                                                <div>
                                                    <h4 className="font-semibold mb-2">About</h4>
                                                    <p className="text-muted-foreground text-sm">{currentProfile.bio}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold mb-2">Interests</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {currentProfile.interests.map((interest) => (
                                                            <Badge key={interest} variant="secondary">{interest}</Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <h4 className="font-semibold mb-1 flex items-center gap-1">
                                                            <Briefcase className="h-4 w-4" /> Occupation
                                                        </h4>
                                                        <p className="text-sm text-muted-foreground">{currentProfile.occupation}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold mb-1 flex items-center gap-1">
                                                            <GraduationCap className="h-4 w-4" /> Education
                                                        </h4>
                                                        <p className="text-sm text-muted-foreground">{currentProfile.education}</p>
                                                    </div>
                                                </div>
                                                <Button asChild className="w-full">
                                                    <Link href={`/profile/${currentProfile.id}`}>View Full Profile</Link>
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>

                                <div className="flex items-center gap-2 mb-3 text-white/90 text-sm">
                                    <Briefcase className="h-4 w-4" />
                                    {currentProfile.occupation}
                                </div>

                                <p className="text-sm text-white/80 line-clamp-2">{currentProfile.bio}</p>

                                <div className="flex flex-wrap gap-2 mt-3">
                                    {currentProfile.interests.slice(0, 4).map((interest) => (
                                        <Badge key={interest} variant="secondary" className="bg-white/20 text-white border-none text-xs">
                                            {interest}
                                        </Badge>
                                    ))}
                                    {currentProfile.interests.length > 4 && (
                                        <Badge variant="secondary" className="bg-white/20 text-white border-none text-xs">
                                            +{currentProfile.interests.length - 4} more
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <Button
                            size="lg"
                            variant="outline"
                            className="h-14 w-14 rounded-full border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            onClick={handlePass}
                        >
                            <X className="h-6 w-6" />
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            className="h-12 w-12 rounded-full"
                            onClick={handleUndo}
                            disabled={actionHistory.length === 0}
                        >
                            <RotateCcw className="h-5 w-5" />
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            className="h-14 w-14 rounded-full border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
                            onClick={handleSuperLike}
                        >
                            <Star className="h-6 w-6" />
                        </Button>

                        <Button
                            size="lg"
                            className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg"
                            onClick={handleLike}
                        >
                            <Heart className="h-7 w-7" />
                        </Button>
                    </div>
                </div>
            </main>

            {/* Match Dialog */}
            <Dialog open={showMatchDialog} onOpenChange={setShowMatchDialog}>
                <DialogContent className="text-center max-w-sm">
                    <div className="py-4">
                        <div className="text-6xl mb-4">🎉</div>
                        <DialogTitle className="text-2xl mb-2">It&apos;s a Match!</DialogTitle>
                        <DialogDescription className="text-lg">
                            You and {matchedProfile?.name} liked each other!
                        </DialogDescription>
                        <div className="flex justify-center mt-6">
                            <Avatar className="h-24 w-24 ring-4 ring-primary">
                                <AvatarImage src={matchedProfile?.photos[0]?.url} />
                                <AvatarFallback>{matchedProfile?.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <Button variant="outline" className="flex-1" onClick={() => setShowMatchDialog(false)}>
                                Keep Swiping
                            </Button>
                            <Button className="flex-1" asChild>
                                <Link href="/messages">Send Message</Link>
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
