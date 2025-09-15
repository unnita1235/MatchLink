"use client";

import type { Profile } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Heart, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Watermark from "./watermark";

type ProfileCardProps = {
  profile: Profile;
};

export default function ProfileCard({ profile }: ProfileCardProps) {
  const [isInterested, setIsInterested] = useState(false);

  const handleInterestClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsInterested(!isInterested);
  };

  return (
    <Link href={`/profile/${profile.id}`} className="group block">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-[4/5]">
          <Image
            src={profile.photos[0].url}
            alt={profile.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={profile.photos[0].hint}
          />
          <Watermark />
          <div className="absolute top-2 right-2">
            <Button
              size="icon"
              className={cn(
                "rounded-full h-9 w-9 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30",
                isInterested && "bg-red-500/80 text-white hover:bg-red-500/90"
              )}
              onClick={handleInterestClick}
            >
              <Heart className={cn("h-5 w-5", isInterested && "fill-current")} />
            </Button>
          </div>
        </div>
        <CardContent className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-headline font-semibold text-lg">{profile.name}</h3>
            <p className="text-sm text-muted-foreground">{profile.age} years old</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
            <MapPin className="h-3 w-3" />
            <span>
              {profile.location.city}, {profile.location.state}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
