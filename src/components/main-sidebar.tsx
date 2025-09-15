"use client";

import {
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from "@/components/ui/sidebar";
import { BotMessageSquare, Gem, LayoutGrid, Settings, Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const MainSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      href: "/",
      label: "Discover",
      icon: LayoutGrid,
    },
    {
      href: "/match",
      label: "AI Matcher",
      icon: BotMessageSquare,
    },
    {
      href: "/packages",
      label: "Packages",
      icon: Gem,
    },
    {
        href: "/settings",
        label: "Settings",
        icon: Settings,
    }
  ];

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-primary hover:bg-primary/10" asChild>
                <Link href="/">
                    <Heart className="w-6 h-6 fill-current" />
                </Link>
            </Button>
            <div className="flex flex-col">
                <h2 className="font-headline text-lg font-semibold">MatchLink</h2>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{
                    children: item.label,
                    className: "bg-sidebar-background text-sidebar-foreground border-sidebar-border"
                  }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-3 p-2">
            <Avatar className="h-9 w-9">
                <AvatarImage src="https://picsum.photos/seed/admin/100/100" alt="Admin" data-ai-hint="person portrait"/>
                <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="text-sm font-semibold">Admin User</span>
                <Link href="#" className="text-xs text-muted-foreground hover:text-primary">Sign Out</Link>
            </div>
        </div>
      </SidebarFooter>
    </>
  );
};

export default MainSidebar;
