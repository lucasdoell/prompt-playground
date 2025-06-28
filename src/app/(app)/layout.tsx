import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      {children}
    </SidebarProvider>
  );
}
