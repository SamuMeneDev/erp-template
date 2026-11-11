import { Navbar } from "@/components/common";
import { DashboardSidebar } from "@/components/layout/DashboradSidebar/DashboardSidebar";
import { SidebarProvider } from "@/components/ui";
import { Outlet } from "react-router";

export default function DashboardLyout() {
    return (
        <div className="h-screen overflow-hidden">
            <SidebarProvider className="flex flex-col">
                <Navbar />
                <main className="flex h-full w-full">
                    <DashboardSidebar />
                    <Outlet />
                </main>
            </SidebarProvider>
        </div>
    )
}