import { SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar, type SidebarContextProps } from "@/components/ui/sidebar";
import type { SubMenuType } from "@/types/SidebarGroup";
import { useLocation, useNavigate } from "react-router";

type SubMenuProps = {
    submenu: SubMenuType
}

export function SubMenu({ submenu }: SubMenuProps) {
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const sideBar = useSidebar();

    function subMenuFunc(sideBar: SidebarContextProps, submenu: SubMenuType) {
        if(sideBar.isMobile) {
            sideBar.setOpenMobile(false);
        }
        return submenu.url ? navigate(submenu.url) : submenu.onClick;
    }

    return (
        <SidebarMenuSub>
            <SidebarMenuSubItem>
                <SidebarMenuSubButton title={submenu.titulo} className="cursor-pointer" isActive={submenu.url?pathname === submenu.url:false} onClick={()=>subMenuFunc(sideBar, submenu)}>
                    <span>{submenu.titulo}</span>
                </SidebarMenuSubButton>
            </SidebarMenuSubItem>
        </SidebarMenuSub>
    )
}