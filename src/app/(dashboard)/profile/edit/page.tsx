"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { getUserProfile, updateUserProfile } from "@/lib/db";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Profile } from "@/lib/types";

// Schema for profile editing
const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    bio: z.string().max(500, "Bio must not exceed 500 characters."),
    occupation: z.string().min(2, "Occupation is required."),
    education: z.string().min(2, "Education is required."),
    location: z.object({
        city: z.string().min(1, "City is required"),
        state: z.string().min(1, "State is required"),
        country: z.string().min(1, "Country is required"),
    }),
    // Simple fields for now, can be expanded
    interests: z.string().describe("Comma separated interests"),
    age: z.coerce.number().min(18, "Must be at least 18."),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function EditProfilePage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            bio: "",
            occupation: "",
            education: "",
            location: { city: "", state: "", country: "" },
            interests: "",
            age: 18,
        },
    });

    useEffect(() => {
        const loadProfile = async () => {
            if (!user) return;
            try {
                const profile = await getUserProfile(user.uid);
                if (profile) {
                    form.reset({
                        name: profile.name,
                        bio: profile.bio || "",
                        occupation: profile.occupation || "",
                        education: profile.education || "",
                        location: profile.location || { city: "", state: "", country: "" },
                        interests: profile.interests.join(", "),
                        age: profile.age,
                    });
                }
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to load your profile.",
                    variant: "destructive"
                })
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, [user, form, toast]);

    async function onSubmit(data: ProfileFormValues) {
        if (!user) return;
        try {
            setLoading(true);
            await updateUserProfile(user.uid, {
                name: data.name,
                bio: data.bio,
                occupation: data.occupation,
                education: data.education,
                location: data.location,
                interests: data.interests.split(",").map((i) => i.trim()).filter(Boolean),
                age: data.age,
            });

            toast({
                title: "Profile updated",
                description: "Your changes have been saved successfully.",
            });
            router.push(`/profile/${user.uid}`);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update profile. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>
    }

    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                    <CardDescription>
                        Update your profile information to help us find better matches.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="age"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Age</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="25" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="occupation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Occupation</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Software Engineer" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="education"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Education</FormLabel>
                                        <FormControl>
                                            <Input placeholder="University of Example" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-3 gap-2">
                                <FormField
                                    control={form.control}
                                    name="location.city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <Input placeholder="New York" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="location.state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>State</FormLabel>
                                            <FormControl>
                                                <Input placeholder="NY" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="location.country"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Country</FormLabel>
                                            <FormControl>
                                                <Input placeholder="USA" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us a little about yourself"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Short bio to introduce yourself to matches.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="interests"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Interests (comma separated)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Hiking, Coding, Coffee" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            List your hobbies and interests to improve matching.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit">Save Changes</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
