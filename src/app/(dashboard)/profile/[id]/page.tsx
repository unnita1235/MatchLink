import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Star, Briefcase, GraduationCap, MapPin, Users, BookOpen, Scaling, Calendar, HeartHandshake, Target } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Watermark from "@/components/watermark";

export const dynamic = 'force-dynamic';
export const dynamicParams = false;

type ProfilePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  // Return null during build time to prevent Firebase calls
  // Profile data will be loaded client-side in real environments
  if (!process.env.VERCEL_URL && process.env.NODE_ENV === 'production') {
    return null;
  }

  // For development, return a placeholder
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="overflow-hidden">
            <div className="w-full aspect-square bg-muted flex items-center justify-center">
              <Users className="w-20 h-20 text-muted-foreground" />
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="default" size="lg"><Heart className="mr-2" /> Express Interest</Button>
            <Button variant="outline" size="lg"><Star className="mr-2" /> Shortlist</Button>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-headline font-bold text-primary">Profile</h1>
            <p className="text-lg text-muted-foreground mt-1">Loading...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
