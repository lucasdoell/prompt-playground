import { AppSidebar } from "@/components/sidebar";
import { TopBar } from "@/components/top-bar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <main className="flex flex-1 flex-col overflow-hidden">
          <TopBar />
          <div className="flex-1 overflow-hidden p-2">
            <div className="h-full rounded-xl bg-background border shadow-sm overflow-hidden">
              {children}
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
