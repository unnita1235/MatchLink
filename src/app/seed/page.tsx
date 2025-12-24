"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { seedProfiles } from "@/lib/data";

export default function SeedPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSeed = async () => {
        setLoading(true);
        try {
            await seedProfiles();
            setMessage("Seeding complete! Check your Firestore 'profiles' collection.");
        } catch (error: any) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
            <h1 className="text-2xl font-bold">Database Seeding</h1>
            <p className="text-muted-foreground">Click below to upload mock profiles to Firestore.</p>
            <Button onClick={handleSeed} disabled={loading}>
                {loading ? "Seeding..." : "Seed Profiles"}
            </Button>
            {message && <p className="mt-4 font-medium">{message}</p>}
        </div>
    );
}
