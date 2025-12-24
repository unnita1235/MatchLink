"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, MessageCircle } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

// Mock conversation data
const mockConversations = [
    {
        id: "conv1",
        participant: {
            id: "1",
            name: "Priya Patel",
            avatar: "https://picsum.photos/seed/prof1/100/100",
            occupation: "Software Engineer",
        },
        lastMessage: {
            text: "That sounds great! Let me know when you're free.",
            timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
            isRead: false,
            senderId: "1",
        },
        matchScore: 92,
    },
    {
        id: "conv2",
        participant: {
            id: "2",
            name: "Rohan Sharma",
            avatar: "https://picsum.photos/seed/prof2/100/100",
            occupation: "Investment Banker",
        },
        lastMessage: {
            text: "Thanks for connecting! Nice to meet you.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            isRead: true,
            senderId: "current",
        },
        matchScore: 85,
    },
    {
        id: "conv3",
        participant: {
            id: "3",
            name: "Chloe Kim",
            avatar: "https://picsum.photos/seed/prof3/100/100",
            occupation: "Graphic Designer",
        },
        lastMessage: {
            text: "I love hiking too! Do you have a favorite trail?",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
            isRead: true,
            senderId: "3",
        },
        matchScore: 88,
    },
    {
        id: "conv4",
        participant: {
            id: "4",
            name: "Aarav Singh",
            avatar: "https://picsum.photos/seed/prof4/100/100",
            occupation: "Architect",
        },
        lastMessage: {
            text: "The museum exhibition sounds interesting!",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
            isRead: true,
            senderId: "current",
        },
        matchScore: 79,
    },
    {
        id: "conv5",
        participant: {
            id: "5",
            name: "Meera Iyer",
            avatar: "https://picsum.photos/seed/prof5/100/100",
            occupation: "Doctor",
        },
        lastMessage: {
            text: "Would love to grab coffee sometime!",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
            isRead: false,
            senderId: "5",
        },
        matchScore: 94,
    },
];

export default function MessagesPage() {
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [conversations, setConversations] = useState(mockConversations);

    const filteredConversations = conversations.filter((conv) =>
        conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const unreadCount = conversations.filter(
        (conv) => !conv.lastMessage.isRead && conv.lastMessage.senderId !== "current"
    ).length;

    return (
        <div className="flex flex-col h-full">
            <header className="bg-card border-b p-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-headline font-semibold text-primary flex items-center gap-2">
                                <MessageCircle className="h-6 w-6" />
                                Messages
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                Chat with your matches
                            </p>
                        </div>
                        {unreadCount > 0 && (
                            <Badge variant="default" className="text-sm">
                                {unreadCount} unread
                            </Badge>
                        )}
                    </div>
                    <div className="mt-4 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search conversations..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-hidden">
                <div className="max-w-4xl mx-auto h-full">
                    {filteredConversations.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-8">
                            <MessageCircle className="h-16 w-16 text-muted-foreground/50 mb-4" />
                            <h2 className="text-xl font-semibold text-foreground mb-2">
                                No conversations yet
                            </h2>
                            <p className="text-muted-foreground max-w-sm">
                                Start matching with profiles to begin chatting. AI-matched connections will appear here.
                            </p>
                        </div>
                    ) : (
                        <ScrollArea className="h-full">
                            <div className="divide-y">
                                {filteredConversations.map((conversation) => {
                                    const isUnread =
                                        !conversation.lastMessage.isRead &&
                                        conversation.lastMessage.senderId !== "current";

                                    return (
                                        <Link
                                            key={conversation.id}
                                            href={`/messages/${conversation.id}`}
                                            className={`block p-4 hover:bg-muted/50 transition-colors ${isUnread ? "bg-primary/5" : ""
                                                }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="relative">
                                                    <Avatar className="h-12 w-12">
                                                        <AvatarImage
                                                            src={conversation.participant.avatar}
                                                            alt={conversation.participant.name}
                                                        />
                                                        <AvatarFallback>
                                                            {conversation.participant.name.charAt(0)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    {isUnread && (
                                                        <div className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full flex items-center justify-center">
                                                            <span className="text-[10px] text-primary-foreground font-bold">
                                                                1
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h3
                                                            className={`font-semibold truncate ${isUnread ? "text-primary" : "text-foreground"
                                                                }`}
                                                        >
                                                            {conversation.participant.name}
                                                        </h3>
                                                        <span className="text-xs text-muted-foreground flex-shrink-0">
                                                            {formatDistanceToNow(conversation.lastMessage.timestamp, {
                                                                addSuffix: true,
                                                            })}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground truncate">
                                                        {conversation.participant.occupation}
                                                    </p>
                                                    <p
                                                        className={`text-sm truncate mt-1 ${isUnread
                                                                ? "text-foreground font-medium"
                                                                : "text-muted-foreground"
                                                            }`}
                                                    >
                                                        {conversation.lastMessage.senderId === "current" && "You: "}
                                                        {conversation.lastMessage.text}
                                                    </p>
                                                </div>
                                                <Badge
                                                    variant="secondary"
                                                    className="text-xs flex-shrink-0"
                                                >
                                                    {conversation.matchScore}% Match
                                                </Badge>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </ScrollArea>
                    )}
                </div>
            </main>
        </div>
    );
}
