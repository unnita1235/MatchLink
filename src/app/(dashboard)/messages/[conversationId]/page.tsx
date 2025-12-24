"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Phone, Video, MoreVertical, Smile, Paperclip } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow, format, isToday, isYesterday } from "date-fns";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock participants data
const mockParticipants: Record<string, { id: string; name: string; avatar: string; occupation: string; matchScore: number; isOnline: boolean }> = {
    conv1: {
        id: "1",
        name: "Priya Patel",
        avatar: "https://picsum.photos/seed/prof1/100/100",
        occupation: "Software Engineer",
        matchScore: 92,
        isOnline: true,
    },
    conv2: {
        id: "2",
        name: "Rohan Sharma",
        avatar: "https://picsum.photos/seed/prof2/100/100",
        occupation: "Investment Banker",
        matchScore: 85,
        isOnline: false,
    },
    conv3: {
        id: "3",
        name: "Chloe Kim",
        avatar: "https://picsum.photos/seed/prof3/100/100",
        occupation: "Graphic Designer",
        matchScore: 88,
        isOnline: true,
    },
    conv4: {
        id: "4",
        name: "Aarav Singh",
        avatar: "https://picsum.photos/seed/prof4/100/100",
        occupation: "Architect",
        matchScore: 79,
        isOnline: false,
    },
    conv5: {
        id: "5",
        name: "Meera Iyer",
        avatar: "https://picsum.photos/seed/prof5/100/100",
        occupation: "Doctor",
        matchScore: 94,
        isOnline: true,
    },
};

// Mock messages data
const mockMessages: Record<string, Array<{ id: string; text: string; senderId: string; timestamp: Date }>> = {
    conv1: [
        { id: "m1", text: "Hey! I saw your profile and I think we have a lot in common!", senderId: "current", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) },
        { id: "m2", text: "Hi there! Yes, I noticed you're also into hiking and tech. Where do you usually go hiking?", senderId: "1", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23) },
        { id: "m3", text: "I love the trails around the Bay Area. Muir Woods is my favorite! Have you been?", senderId: "current", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22) },
        { id: "m4", text: "Yes! It's beautiful there. We should plan a hike sometime. What do you think?", senderId: "1", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20) },
        { id: "m5", text: "That sounds amazing! I'd love that.", senderId: "current", timestamp: new Date(Date.now() - 1000 * 60 * 30) },
        { id: "m6", text: "That sounds great! Let me know when you're free.", senderId: "1", timestamp: new Date(Date.now() - 1000 * 60 * 5) },
    ],
    conv2: [
        { id: "m1", text: "Thanks for the match! Nice to meet you.", senderId: "current", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
        { id: "m2", text: "Nice to meet you too! I see you're also into jazz.", senderId: "2", timestamp: new Date(Date.now() - 1000 * 60 * 60) },
        { id: "m3", text: "Thanks for connecting! Nice to meet you.", senderId: "current", timestamp: new Date(Date.now() - 1000 * 60 * 30) },
    ],
    conv3: [
        { id: "m1", text: "Hello! Your art portfolio is stunning!", senderId: "current", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48) },
        { id: "m2", text: "Thank you so much! Are you into art as well?", senderId: "3", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 47) },
        { id: "m3", text: "I appreciate it a lot! Also love hiking and outdoor activities.", senderId: "current", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 46) },
        { id: "m4", text: "I love hiking too! Do you have a favorite trail?", senderId: "3", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) },
    ],
    conv4: [
        { id: "m1", text: "Hi! I really admire your architecture work.", senderId: "current", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72) },
        { id: "m2", text: "Thank you! Sustainable design is my passion.", senderId: "4", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 70) },
        { id: "m3", text: "That's amazing. I'd love to hear more about it.", senderId: "current", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 50) },
        { id: "m4", text: "The museum exhibition sounds interesting!", senderId: "current", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48) },
    ],
    conv5: [
        { id: "m1", text: "Hey! Our compatibility score is amazing!", senderId: "current", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120) },
        { id: "m2", text: "I know right! 94% is incredible.", senderId: "5", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 118) },
        { id: "m3", text: "Would love to grab coffee sometime!", senderId: "5", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 100) },
    ],
};

function formatMessageTime(date: Date): string {
    if (isToday(date)) {
        return format(date, "h:mm a");
    } else if (isYesterday(date)) {
        return "Yesterday " + format(date, "h:mm a");
    } else {
        return format(date, "MMM d, h:mm a");
    }
}

type ChatPageProps = {
    params: Promise<{
        conversationId: string;
    }>;
};

export default function ChatPage({ params }: ChatPageProps) {
    const { user } = useAuth();
    const [resolvedParams, setResolvedParams] = useState<{ conversationId: string } | null>(null);
    const [messages, setMessages] = useState<Array<{ id: string; text: string; senderId: string; timestamp: Date }>>([]);
    const [newMessage, setNewMessage] = useState("");
    const [participant, setParticipant] = useState<typeof mockParticipants.conv1 | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        params.then(setResolvedParams);
    }, [params]);

    useEffect(() => {
        if (resolvedParams) {
            const conversationId = resolvedParams.conversationId;
            setMessages(mockMessages[conversationId] || []);
            setParticipant(mockParticipants[conversationId] || null);
        }
    }, [resolvedParams]);

    useEffect(() => {
        // Scroll to bottom when messages change
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        const message = {
            id: `m${Date.now()}`,
            text: newMessage,
            senderId: "current",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, message]);
        setNewMessage("");
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (!resolvedParams || !participant) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            {/* Chat Header */}
            <header className="bg-card border-b p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/messages">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={participant.avatar} alt={participant.name} />
                                    <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {participant.isOnline && (
                                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                                )}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="font-semibold">{participant.name}</h2>
                                    <Badge variant="secondary" className="text-xs">
                                        {participant.matchScore}% Match
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {participant.isOnline ? "Online" : "Last seen recently"}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                            <Phone className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Video className="h-5 w-5" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                    <Link href={`/profile/${participant.id}`}>View Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>Block User</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Report</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
                {messages.map((message, index) => {
                    const isCurrentUser = message.senderId === "current";
                    const showAvatar =
                        !isCurrentUser &&
                        (index === 0 || messages[index - 1].senderId !== message.senderId);

                    return (
                        <div
                            key={message.id}
                            className={`flex items-end gap-2 ${isCurrentUser ? "justify-end" : "justify-start"}`}
                        >
                            {!isCurrentUser && showAvatar && (
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={participant.avatar} alt={participant.name} />
                                    <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            )}
                            {!isCurrentUser && !showAvatar && <div className="w-8" />}
                            <div
                                className={`max-w-[70%] rounded-2xl px-4 py-2 ${isCurrentUser
                                        ? "bg-primary text-primary-foreground rounded-br-sm"
                                        : "bg-card border rounded-bl-sm"
                                    }`}
                            >
                                <p className="text-sm">{message.text}</p>
                                <p
                                    className={`text-xs mt-1 ${isCurrentUser ? "text-primary-foreground/70" : "text-muted-foreground"
                                        }`}
                                >
                                    {formatMessageTime(message.timestamp)}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Message Input */}
            <div className="bg-card border-t p-4">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Paperclip className="h-5 w-5" />
                    </Button>
                    <div className="flex-1 relative">
                        <Input
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyPress}
                            className="pr-10"
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full"
                        >
                            <Smile className="h-5 w-5" />
                        </Button>
                    </div>
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
