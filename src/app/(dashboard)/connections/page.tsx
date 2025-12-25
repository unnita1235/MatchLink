"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCheck, UserPlus, Clock, MessageCircle, X, Heart } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

// Mock connections data
const mockConnections = {
    matches: [
        {
            id: "1",
            name: "Priya Patel",
            avatar: "https://picsum.photos/seed/prof1/100/100",
            occupation: "Software Engineer",
            location: "San Francisco, CA",
            matchScore: 92,
            matchedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        },
        {
            id: "2",
            name: "Rohan Sharma",
            avatar: "https://picsum.photos/seed/prof2/100/100",
            occupation: "Investment Banker",
            location: "New York, NY",
            matchScore: 85,
            matchedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
        },
        {
            id: "3",
            name: "Chloe Kim",
            avatar: "https://picsum.photos/seed/prof3/100/100",
            occupation: "Graphic Designer",
            location: "Los Angeles, CA",
            matchScore: 88,
            matchedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        },
    ],
    pending: [
        {
            id: "4",
            name: "Aarav Singh",
            avatar: "https://picsum.photos/seed/prof4/100/100",
            occupation: "Architect",
            location: "Chicago, IL",
            matchScore: 79,
            requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
        },
        {
            id: "5",
            name: "Meera Iyer",
            avatar: "https://picsum.photos/seed/prof5/100/100",
            occupation: "Doctor",
            location: "Austin, TX",
            matchScore: 94,
            requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        },
    ],
    sent: [
        {
            id: "6",
            name: "David Chen",
            avatar: "https://picsum.photos/seed/prof6/100/100",
            occupation: "Data Scientist",
            location: "Seattle, WA",
            matchScore: 81,
            sentAt: new Date(Date.now() - 1000 * 60 * 60 * 36),
        },
    ],
};

export default function ConnectionsPage() {
    const { toast } = useToast();
    const [connections, setConnections] = useState(mockConnections);

    const handleAccept = (id: string) => {
        const request = connections.pending.find((p) => p.id === id);
        if (request) {
            setConnections((prev) => ({
                ...prev,
                pending: prev.pending.filter((p) => p.id !== id),
                matches: [...prev.matches, { ...request, matchedAt: new Date() }],
            }));
            toast({
                title: "Connection accepted! 🎉",
                description: `You are now connected with ${request.name}.`,
            });
        }
    };

    const handleDecline = (id: string) => {
        setConnections((prev) => ({
            ...prev,
            pending: prev.pending.filter((p) => p.id !== id),
        }));
        toast({
            title: "Request declined",
            description: "The connection request has been declined.",
        });
    };

    const handleWithdraw = (id: string) => {
        setConnections((prev) => ({
            ...prev,
            sent: prev.sent.filter((s) => s.id !== id),
        }));
        toast({
            title: "Request withdrawn",
            description: "Your connection request has been withdrawn.",
        });
    };

    return (
        <div className="flex flex-col h-full">
            <header className="bg-card border-b p-4">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-2xl font-headline font-semibold text-primary flex items-center gap-2">
                        <UserCheck className="h-6 w-6" />
                        Connections
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your matches and connection requests.
                    </p>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                <div className="max-w-5xl mx-auto">
                    <Tabs defaultValue="matches" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-6">
                            <TabsTrigger value="matches" className="flex items-center gap-2">
                                <Heart className="h-4 w-4" />
                                Matches ({connections.matches.length})
                            </TabsTrigger>
                            <TabsTrigger value="pending" className="flex items-center gap-2">
                                <UserPlus className="h-4 w-4" />
                                Received ({connections.pending.length})
                            </TabsTrigger>
                            <TabsTrigger value="sent" className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Sent ({connections.sent.length})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="matches">
                            {connections.matches.length === 0 ? (
                                <Card className="p-8 text-center">
                                    <Heart className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">No matches yet</h3>
                                    <p className="text-muted-foreground">
                                        Start discovering profiles and express interest to get matched!
                                    </p>
                                </Card>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {connections.matches.map((match) => (
                                        <Card key={match.id} className="overflow-hidden">
                                            <CardContent className="p-4">
                                                <div className="flex items-start gap-4">
                                                    <Avatar className="h-16 w-16">
                                                        <AvatarImage src={match.avatar} alt={match.name} />
                                                        <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <Link
                                                                href={`/profile/${match.id}`}
                                                                className="font-semibold hover:text-primary transition-colors truncate"
                                                            >
                                                                {match.name}
                                                            </Link>
                                                            <Badge variant="secondary" className="text-xs ml-2 flex-shrink-0">
                                                                {match.matchScore}%
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground truncate">
                                                            {match.occupation}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground truncate">
                                                            {match.location}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 mt-4">
                                                    <Button size="sm" className="flex-1" asChild>
                                                        <Link href={`/messages/conv${match.id}`}>
                                                            <MessageCircle className="h-4 w-4 mr-1" />
                                                            Message
                                                        </Link>
                                                    </Button>
                                                    <Button size="sm" variant="outline" asChild>
                                                        <Link href={`/profile/${match.id}`}>View</Link>
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="pending">
                            {connections.pending.length === 0 ? (
                                <Card className="p-8 text-center">
                                    <UserPlus className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">No pending requests</h3>
                                    <p className="text-muted-foreground">
                                        New connection requests will appear here.
                                    </p>
                                </Card>
                            ) : (
                                <div className="space-y-4">
                                    {connections.pending.map((request) => (
                                        <Card key={request.id}>
                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-4">
                                                    <Avatar className="h-16 w-16">
                                                        <AvatarImage src={request.avatar} alt={request.name} />
                                                        <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Link
                                                                href={`/profile/${request.id}`}
                                                                className="font-semibold hover:text-primary transition-colors"
                                                            >
                                                                {request.name}
                                                            </Link>
                                                            <Badge variant="default" className="text-xs">
                                                                {request.matchScore}% Match
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">
                                                            {request.occupation} • {request.location}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            Wants to connect with you
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button size="sm" onClick={() => handleAccept(request.id)}>
                                                            Accept
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleDecline(request.id)}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="sent">
                            {connections.sent.length === 0 ? (
                                <Card className="p-8 text-center">
                                    <Clock className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">No pending sent requests</h3>
                                    <p className="text-muted-foreground">
                                        Connection requests you&apos;ve sent will appear here.
                                    </p>
                                </Card>
                            ) : (
                                <div className="space-y-4">
                                    {connections.sent.map((request) => (
                                        <Card key={request.id}>
                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-4">
                                                    <Avatar className="h-16 w-16">
                                                        <AvatarImage src={request.avatar} alt={request.name} />
                                                        <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Link
                                                                href={`/profile/${request.id}`}
                                                                className="font-semibold hover:text-primary transition-colors"
                                                            >
                                                                {request.name}
                                                            </Link>
                                                            <Badge variant="secondary" className="text-xs">
                                                                {request.matchScore}% Match
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">
                                                            {request.occupation} • {request.location}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            Awaiting response...
                                                        </p>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleWithdraw(request.id)}
                                                    >
                                                        Withdraw
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}
