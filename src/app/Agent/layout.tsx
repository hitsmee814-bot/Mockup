"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AgentSidebar } from "@/app/components/Agent/AgentSidebar/AgentSidebar";
import { AgentHeader } from "@/app/components/Agent/AgentHeader";
import { useEffect, useRef, useState } from "react";

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerRef = useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex flex-col h-screen w-full">
        <AgentHeader ref={headerRef} />

        <div
          className="flex flex-1 overflow-hidden"
          style={{ marginTop: headerHeight }}
        >
          <AgentSidebar />

          <SidebarInset className="flex flex-col flex-1 min-w-0">
            <main className="flex-1 overflow-y-auto bg-gray-50 p-[2rem]">
              {children}
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}

// Add suppressHydrationWarning to the html/body in your root layout
// If you don't have a root layout, create one at: Mockup/src/app/layout.tsx

 function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}