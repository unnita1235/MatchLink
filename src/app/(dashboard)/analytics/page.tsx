"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Eye, Heart, MessageCircle, TrendingUp, Users, Star, Target } from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell
} from "recharts";

// Mock analytics data
const profileViewsData = [
    { date: "Mon", views: 12 },
    { date: "Tue", views: 19 },
    { date: "Wed", views: 14 },
    { date: "Thu", views: 28 },
    { date: "Fri", views: 32 },
    { date: "Sat", views: 45 },
    { date: "Sun", views: 38 },
];

const matchActivityData = [
    { category: "Interests Sent", value: 24 },
    { category: "Interests Received", value: 18 },
    { category: "Matches Made", value: 8 },
    { category: "Messages Started", value: 12 },
];

const matchQualityData = [
    { name: "90-100%", value: 3, color: "hsl(var(--chart-1))" },
    { name: "80-89%", value: 5, color: "hsl(var(--chart-2))" },
    { name: "70-79%", value: 4, color: "hsl(var(--chart-3))" },
    { name: "60-69%", value: 2, color: "hsl(var(--chart-4))" },
];

const statsCards = [
    {
        title: "Profile Views",
        value: "188",
        change: "+23%",
        trend: "up",
        icon: Eye,
        description: "This week",
    },
    {
        title: "Matches",
        value: "14",
        change: "+5",
        trend: "up",
        icon: Heart,
        description: "Total active",
    },
    {
        title: "Messages",
        value: "47",
        change: "+12",
        trend: "up",
        icon: MessageCircle,
        description: "This week",
    },
    {
        title: "Response Rate",
        value: "76%",
        change: "+4%",
        trend: "up",
        icon: TrendingUp,
        description: "Average",
    },
];

const topMatches = [
    { name: "Priya Patel", score: 92, occupation: "Software Engineer" },
    { name: "Meera Iyer", score: 94, occupation: "Doctor" },
    { name: "Chloe Kim", score: 88, occupation: "Graphic Designer" },
];

export default function AnalyticsPage() {
    return (
        <div className="flex flex-col h-full">
            <header className="bg-card border-b p-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl font-headline font-semibold text-primary flex items-center gap-2">
                        <BarChart3 className="h-6 w-6" />
                        Analytics Dashboard
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Track your profile performance and matching insights.
                    </p>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {statsCards.map((stat, index) => (
                            <Card key={index}>
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">{stat.title}</p>
                                            <p className="text-3xl font-bold font-headline mt-1">{stat.value}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Badge
                                                    variant={stat.trend === "up" ? "default" : "secondary"}
                                                    className="text-xs"
                                                >
                                                    {stat.change}
                                                </Badge>
                                                <span className="text-xs text-muted-foreground">{stat.description}</span>
                                            </div>
                                        </div>
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <stat.icon className="h-5 w-5 text-primary" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Profile Views Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Eye className="h-5 w-5 text-primary" />
                                    Profile Views
                                </CardTitle>
                                <CardDescription>Daily views over the past week</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={profileViewsData}>
                                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                            <XAxis
                                                dataKey="date"
                                                className="text-xs"
                                                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                            />
                                            <YAxis
                                                className="text-xs"
                                                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'hsl(var(--card))',
                                                    border: '1px solid hsl(var(--border))',
                                                    borderRadius: '8px',
                                                }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="views"
                                                stroke="hsl(var(--primary))"
                                                strokeWidth={2}
                                                dot={{ fill: 'hsl(var(--primary))' }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Match Activity Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Heart className="h-5 w-5 text-primary" />
                                    Match Activity
                                </CardTitle>
                                <CardDescription>Your interaction breakdown</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={matchActivityData} layout="vertical">
                                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                            <XAxis
                                                type="number"
                                                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                            />
                                            <YAxis
                                                type="category"
                                                dataKey="category"
                                                width={120}
                                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'hsl(var(--card))',
                                                    border: '1px solid hsl(var(--border))',
                                                    borderRadius: '8px',
                                                }}
                                            />
                                            <Bar
                                                dataKey="value"
                                                fill="hsl(var(--primary))"
                                                radius={[0, 4, 4, 0]}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Bottom Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Match Quality Distribution */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Target className="h-5 w-5 text-primary" />
                                    Match Quality
                                </CardTitle>
                                <CardDescription>Score distribution of your matches</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[200px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={matchQualityData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={50}
                                                outerRadius={70}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {matchQualityData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'hsl(var(--card))',
                                                    border: '1px solid hsl(var(--border))',
                                                    borderRadius: '8px',
                                                }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex flex-wrap justify-center gap-4 mt-4">
                                    {matchQualityData.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: item.color }}
                                            />
                                            <span className="text-xs text-muted-foreground">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Top Matches */}
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Star className="h-5 w-5 text-primary" />
                                    Top Compatibility Matches
                                </CardTitle>
                                <CardDescription>Your highest scoring potential matches</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {topMatches.map((match, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{match.name}</p>
                                                    <p className="text-sm text-muted-foreground">{match.occupation}</p>
                                                </div>
                                            </div>
                                            <Badge variant="default" className="text-sm">
                                                {match.score}% Match
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Insights Card */}
                    <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/20 rounded-lg">
                                    <TrendingUp className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Profile Performance Insight</h3>
                                    <p className="text-muted-foreground mt-1">
                                        Your profile views increased by <strong>23%</strong> this week!
                                        Profiles with complete bios and multiple photos tend to receive
                                        <strong> 3x more views</strong>. Consider adding more photos to boost visibility.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
