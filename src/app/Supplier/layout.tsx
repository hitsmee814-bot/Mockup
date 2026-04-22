"use client"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SupplierSidebar } from "@/app/components/Supplier/SupplierSidebar/SupplierSideBar"
import { SupplierHeader } from "@/app/components/Supplier/SupplierHeader"
import { useEffect, useRef, useState } from "react"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const headerRef = useRef<HTMLElement | null>(null)
  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight)
      }
    }

    updateHeaderHeight()
    window.addEventListener("resize", updateHeaderHeight)

    return () => {
      window.removeEventListener("resize", updateHeaderHeight)
    }
  }, [])

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex flex-col h-screen w-full">
        <SupplierHeader ref={headerRef} />

        <div
          className="flex flex-1 overflow-hidden"
          style={{ marginTop: headerHeight }}
        >
          <SupplierSidebar />

          <SidebarInset className="flex flex-col flex-1 min-w-0">
            <main className="flex-1 overflow-y-auto bg-gray-50 p-[2rem]">
              {children}
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}