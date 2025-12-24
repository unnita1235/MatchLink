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
import { BotMessageSquare, Gem, LayoutGrid, Settings, Heart, Users, MessageCircle, BarChart3, UserCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "./theme-toggle";
import { Badge } from "./ui/badge";

const MainSidebar = () => {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

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
      href: "/messages",
      label: "Messages",
      icon: MessageCircle,
      badge: 2, // Unread count
    },
    {
      href: "/connections",
      label: "Connections",
      icon: UserCheck,
    },
    {
      href: "/analytics",
      label: "Analytics",
      icon: BarChart3,
    },
    {
      href: "/packages",
      label: "Packages",
      icon: Gem,
    },
    {
      href: "/profile/edit",
      label: "Edit Profile",
      icon: Users,
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-primary hover:bg-primary/10" asChild>
              <Link href="/">
                <Heart className="w-6 h-6 fill-current" />
              </Link>
            </Button>
            <div className="flex flex-col">
              <h2 className="font-headline text-lg font-semibold">MatchLink</h2>
              <p className="text-xs text-muted-foreground">Find Your Match</p>
            </div>
          </div>
          <ThemeToggle />
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
                  <Link href={item.href} className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <item.icon />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge variant="default" className="h-5 min-w-5 px-1.5 text-xs">
                        {item.badge}
                      </Badge>
                    )}
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
            <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold truncate">{user?.displayName || user?.email || "User"}</span>
            <button onClick={() => signOut()} className="text-xs text-muted-foreground hover:text-primary text-left">Sign Out</button>
          </div>
        </div>
      </SidebarFooter>
    </>
  );
};

export default MainSidebar;
