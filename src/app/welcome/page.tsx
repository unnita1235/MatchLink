"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Users, MessageCircle, Shield, BarChart3, Star, ArrowRight, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Feature card data
const features = [
    {
        icon: Sparkles,
        title: "AI-Powered Matching",
        description: "Our intelligent algorithm analyzes compatibility across 50+ dimensions to find your perfect match."
    },
    {
        icon: Users,
        title: "Verified Profiles",
        description: "Every profile is verified for authenticity. Connect with real people seeking genuine relationships."
    },
    {
        icon: MessageCircle,
        title: "Real-Time Messaging",
        description: "Instant messaging with matched connections. Break the ice with AI-suggested conversation starters."
    },
    {
        icon: Shield,
        title: "Privacy First",
        description: "Your data is encrypted and secure. Control who sees your profile and when."
    },
    {
        icon: BarChart3,
        title: "Match Analytics",
        description: "Track your profile views, match rates, and get insights to improve your success."
    },
    {
        icon: Heart,
        title: "Compatibility Score",
        description: "See detailed compatibility scores before connecting. Know your match potential upfront."
    }
];

// Testimonial data
const testimonials = [
    {
        name: "Priya S.",
        role: "Software Engineer",
        image: "https://picsum.photos/seed/test1/100/100",
        quote: "MatchLink helped me find someone who truly understands my crazy tech schedule. We connected over our love for hiking and now we're planning our wedding!"
    },
    {
        name: "Rohan M.",
        role: "Investment Banker",
        image: "https://picsum.photos/seed/test2/100/100",
        quote: "The AI matching is incredible. It found someone with interests I didn't even know mattered to me. Thank you MatchLink!"
    },
    {
        name: "Ananya K.",
        role: "Doctor",
        image: "https://picsum.photos/seed/test3/100/100",
        quote: "As a busy doctor, I had no time for traditional dating. MatchLink's smart filtering saved me hours and found my perfect partner."
    }
];

// Stats data
const stats = [
    { value: "50K+", label: "Active Users" },
    { value: "12K+", label: "Successful Matches" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "4.9", label: "App Store Rating" }
];

export default function WelcomePage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (!loading && user) {
            router.push("/");
        }
    }, [user, loading, router]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    if (user) {
        return null; // Will redirect
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <Heart className="w-8 h-8 text-primary fill-primary" />
                            <span className="text-xl font-headline font-bold">MatchLink</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" asChild>
                                <Link href="/login">Sign In</Link>
                            </Button>
                            <Button asChild className="bg-primary hover:bg-primary/90">
                                <Link href="/signup">Get Started</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 animate-bounce">
                        <Sparkles className="w-4 h-4" />
                        AI-Powered Professional Networking
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-bold text-foreground mb-6 leading-tight">
                        Find Your{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                            Perfect Match
                        </span>
                        <br />
                        with AI Precision
                    </h1>

                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        MatchLink uses advanced AI algorithms to connect you with compatible professionals
                        based on skills, interests, and life goals. Stop scrolling, start connecting.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Button size="lg" asChild className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
                            <Link href="/signup">
                                Create Free Account
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
                            <Link href="#features">
                                Learn More
                                <ChevronDown className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                    </div>

                    {/* Floating profile cards preview */}
                    <div className="relative w-full max-w-3xl mx-auto h-64 sm:h-80">
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-48 sm:w-56 h-64 sm:h-72 bg-card rounded-2xl shadow-2xl transform rotate-[-8deg] transition-transform hover:rotate-[-4deg] overflow-hidden border">
                            <Image src="https://picsum.photos/seed/card1/300/400" alt="Profile" fill sizes="300px" className="object-cover" />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                <p className="text-white font-semibold">Sarah, 28</p>
                                <p className="text-white/80 text-sm">Software Engineer</p>
                            </div>
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 top-4 sm:top-8 w-52 sm:w-64 h-68 sm:h-80 bg-card rounded-2xl shadow-2xl transform rotate-[4deg] transition-transform hover:rotate-[2deg] overflow-hidden border z-10">
                            <Image src="https://picsum.photos/seed/card2/300/400" alt="Profile" fill sizes="300px" className="object-cover" />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                <p className="text-white font-semibold">James, 32</p>
                                <p className="text-white/80 text-sm">Data Scientist</p>
                            </div>
                            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                <Heart className="w-3 h-3 fill-white" /> 92% Match
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-card/50 backdrop-blur-sm border-y">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl sm:text-4xl font-headline font-bold text-primary mb-2">{stat.value}</div>
                                <div className="text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 sm:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-foreground mb-4">
                            Why Choose MatchLink?
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            We&apos;ve built the most advanced matching platform that combines AI intelligence
                            with genuine human connection.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group p-6 bg-card rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                    <feature.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-headline font-semibold text-foreground mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 sm:py-32 bg-gradient-to-b from-primary/5 to-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-foreground mb-4">
                            How It Works
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Finding your perfect match is as easy as 1-2-3
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: "1", title: "Create Your Profile", description: "Sign up and tell us about yourself, your interests, and what you're looking for in a partner." },
                            { step: "2", title: "Get AI Matches", description: "Our AI analyzes compatibility and presents you with curated matches tailored to your preferences." },
                            { step: "3", title: "Connect & Chat", description: "Express interest, start conversations, and build meaningful connections with your matches." }
                        ].map((item, index) => (
                            <div key={index} className="relative text-center">
                                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                                    {item.step}
                                </div>
                                {index < 2 && (
                                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-primary/30" />
                                )}
                                <h3 className="text-xl font-headline font-semibold text-foreground mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-muted-foreground">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 sm:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-foreground mb-4">
                            Success Stories
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Join thousands of professionals who found their perfect match
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="p-6 bg-card rounded-2xl border shadow-sm"
                            >
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground mb-6 italic">
                                    &quot;{testimonial.quote}&quot;
                                </p>
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        width={48}
                                        height={48}
                                        className="rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 sm:py-32">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl shadow-primary/25">
                        <h2 className="text-3xl sm:text-4xl font-headline font-bold mb-4">
                            Ready to Find Your Match?
                        </h2>
                        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                            Join MatchLink today and let our AI find your perfect compatible partner.
                            It&apos;s free to start!
                        </p>
                        <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
                            <Link href="/signup">
                                Get Started Free
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-card border-t py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <Heart className="w-6 h-6 text-primary fill-primary" />
                                <span className="text-lg font-headline font-bold">MatchLink</span>
                            </div>
                            <p className="text-muted-foreground text-sm">
                                AI-powered professional networking and matching platform.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
                                <li><Link href="/packages" className="hover:text-primary transition-colors">Pricing</Link></li>
                                <li><Link href="/signup" className="hover:text-primary transition-colors">Sign Up</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
                        <p>© {new Date().getFullYear()} MatchLink. All rights reserved. Built by <a href="https://github.com/unnita1235" className="text-primary hover:underline">Unni T A</a></p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
