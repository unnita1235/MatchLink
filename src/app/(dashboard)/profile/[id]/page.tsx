import { getUserProfile } from "@/lib/db";
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
  const { id } = await params;
  const profile = await getUserProfile(id);

  if (!profile) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Image and Actions) */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="overflow-hidden">
            <Carousel className="w-full">
              <CarouselContent>
                {profile.photos && profile.photos.length > 0 ? (
                  profile.photos.map((photo, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-square">
                        <Image
                          src={photo.url}
                          alt={`${profile.name}'s photo ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index === 0}
                          data-ai-hint={photo.hint}
                        />
                        <Watermark />
                      </div>
                    </CarouselItem>
                  ))
                ) : (
                  <CarouselItem>
                    <div className="relative aspect-square bg-muted flex items-center justify-center">
                      <Users className="w-20 h-20 text-muted-foreground" />
                      <Watermark />
                    </div>
                  </CarouselItem>
                )}
              </CarouselContent>
              {profile.photos && profile.photos.length > 1 && (
                <>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </>
              )}
            </Carousel>
          </Card>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="default" size="lg"><Heart className="mr-2" /> Express Interest</Button>
            <Button variant="outline" size="lg"><Star className="mr-2" /> Shortlist</Button>
          </div>
        </div>

        {/* Right Column (Profile Details) */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-headline font-bold text-primary">{profile.name}</h1>
            <p className="text-lg text-muted-foreground mt-1">{profile.age || 'N/A'} years old • {profile.occupation || 'N/A'}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.interests?.map((interest) => (
              <Badge key={interest} variant="secondary">{interest}</Badge>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-lg">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{profile.bio || "No bio information provided."}</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-lg flex items-center gap-2"><Briefcase className="text-primary" /> Vitals & Vocation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex"><GraduationCap className="w-5 h-5 mr-3 text-muted-foreground flex-shrink-0" /><span>{profile.education || 'N/A'}</span></div>
                <div className="flex"><Briefcase className="w-5 h-5 mr-3 text-muted-foreground flex-shrink-0" /><span>{profile.occupation || 'N/A'}</span></div>
                <div className="flex"><MapPin className="w-5 h-5 mr-3 text-muted-foreground flex-shrink-0" /><span>{profile.location?.city || 'City'}, {profile.location?.state || 'State'}</span></div>
                <div className="flex"><Scaling className="w-5 h-5 mr-3 text-muted-foreground flex-shrink-0" /><span>{profile.height || 'N/A'}</span></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-lg flex items-center gap-2"><HeartHandshake className="text-primary" /> Religion & Family</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex"><BookOpen className="w-5 h-5 mr-3 text-muted-foreground flex-shrink-0" /><span>{profile.religionInfo?.religion || 'N/A'}, {profile.religionInfo?.caste || 'N/A'}</span></div>
                <div className="flex"><Users className="w-5 h-5 mr-3 text-muted-foreground flex-shrink-0" /><span>{profile.familyDetails?.bio || 'No family details available.'}</span></div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="font-headline text-lg flex items-center gap-2"><Target className="text-primary" /> Partner Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground italic">&quot;{profile.partnerPreferences?.bio || 'No preference bio.'}&quot;</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-primary" /> Age: {profile.partnerPreferences?.ageRange || 'Any'}</div>
                <div className="flex items-center"><Scaling className="w-4 h-4 mr-2 text-primary" /> Height: {profile.partnerPreferences?.heightRange || 'Any'}</div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Looking for someone interested in:</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.partnerPreferences?.interests?.map((interest) => (
                    <Badge key={interest} variant="outline">{interest}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
