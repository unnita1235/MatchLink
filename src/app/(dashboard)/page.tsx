import { profiles } from "@/lib/data";
import ProfileCard from "@/components/profile-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="bg-card border-b p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-headline font-semibold text-primary">
            Discover Profiles
          </h1>
          <p className="text-muted-foreground mt-1">
            Browse and find your potential match.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Input placeholder="Search by name, city, or interest..." className="max-w-xs" />
            <Button variant="outline">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {profiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
