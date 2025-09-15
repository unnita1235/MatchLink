import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const packages = [
  {
    name: "Free",
    price: "$0",
    description: "Get started and explore basic profiles.",
    features: [
      "Create your profile",
      "Browse profiles",
      "Receive matches",
      "Express interest in 5 profiles",
    ],
    buttonText: "Current Plan",
    variant: "outline"
  },
  {
    name: "Premium",
    price: "$29.99",
    description: "Unlock more features and increase your chances.",
    features: [
      "Everything in Free, plus:",
      "Unlimited interests",
      "See who viewed your profile",
      "Advanced search filters",
      "AI Match reasoning",
      "Message up to 20 profiles",
    ],
    buttonText: "Upgrade to Premium",
    variant: "default"
  },
  {
    name: "VIP",
    price: "$59.99",
    description: "The ultimate experience with all features unlocked.",
    features: [
      "Everything in Premium, plus:",
      "Profile boost once a week",
      "Unlimited messaging",
      "See who shortlisted you",
      "Watermark-free image viewing",
      "Dedicated assistance",
    ],
    buttonText: "Go VIP",
    variant: "default"
  },
];

export default function PackagesPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="bg-card border-b p-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-headline font-semibold text-primary">
            Subscription Packages
          </h1>
          <p className="text-muted-foreground mt-1">
            Choose a plan that works for you and find your match faster.
          </p>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.name} className={`flex flex-col ${pkg.name === 'Premium' ? 'border-primary ring-2 ring-primary shadow-lg' : ''}`}>
              <CardHeader>
                <CardTitle className="font-headline">{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
                <div>
                  <span className="text-4xl font-bold font-headline">{pkg.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={pkg.name === 'Premium' ? 'default' : 'outline'}>
                  {pkg.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
