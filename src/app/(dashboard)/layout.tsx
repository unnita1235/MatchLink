import MainSidebar from "@/components/main-sidebar";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from "@/components/ui/sidebar";
import AuthGuard from "@/components/auth-guard";

export const dynamic = 'force-dynamic';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AuthGuard>
        <Sidebar>
          <MainSidebar />
        </Sidebar>
        <SidebarInset>{children}</SidebarInset>
      </AuthGuard>
    </SidebarProvider>
  );
}
