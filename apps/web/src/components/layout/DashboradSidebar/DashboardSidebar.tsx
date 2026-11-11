import { Sidebar, SidebarContent, SidebarRail, useSidebar } from "@/components/ui";
import { Header } from "./Header";
import { Group } from "./Group";
import { groupData, temAcesso } from "@/utils/groupData";
import { useMe } from "@erp-template/services";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";


/**
 * Barra lateral da dashboard
 */
export function DashboardSidebar() {
    const { data } = useMe();
    const { open, isMobile } = useSidebar();


    const rotasPermitidas = groupData.filter(g => temAcesso(data?.data.role, g.exclusive))

    return (
        <Sidebar className="relative h-full mr-2" collapsible="icon" variant="sidebar">
            <Header />
            <SidebarContent>
                {rotasPermitidas.map((g, index)=>(
                    g.exclusive !== data?.data.role && (
                        <Group key={index} group={g} />
                    )
                ))}
            </SidebarContent>
            {!isMobile && (
                <SidebarRail>
                    <div className="p-2 text-stone-800 dark:text-white">
                        {open ? <PanelLeftClose size={20} /> :<PanelLeftOpen size={20} />}
                    </div>
                </SidebarRail>
            )}
        </Sidebar>
    )
}