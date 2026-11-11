import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { Menu, UserRound } from "lucide-react";
import { LogoutAlert } from "./LogoutAlert";
import { useMe } from "@erp-template/services";

import { Button } from "@/components/ui/button";

export function Header() {
    const { data } = useMe()
    const { open, isMobile, toggleSidebar } = useSidebar();
    
    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center justify-between gap-2">
                        <LogoutAlert trigger={
                            <SidebarMenuButton>
                                <UserRound />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">{data?.data.nome}</span>
                                    <span className="text-xs text-stone-600">Clique para sair</span>
                                </div>
                            </SidebarMenuButton>
                        } />

                        {open && isMobile && (
                            <Button variant="ghost" size="icon-lg" onClick={toggleSidebar}>
                                <Menu />
                            </Button>
                        )}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>

    )
}