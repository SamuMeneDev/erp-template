import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar, type SidebarContextProps } from "@/components/ui/sidebar";
import { SubMenu } from "./SubMenu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import type { MenuType } from "@/types/SidebarGroup";
import { useLocation, useNavigate } from "react-router";
import { temAcesso } from "@/utils/groupData";
import { useMe } from "@erp-template/services";

type MenuProps = {
    menu: MenuType;
}


/**
 * Componente do menu individual da sidebar
 */
export function Menu({menu}: MenuProps) {
    const navigate = useNavigate();
    const { data } = useMe();
    const pathname = useLocation().pathname;
    const sideBar = useSidebar();

    const rotasPermitidas = menu.submenu?.filter(s=>temAcesso(data?.data.role, s.exclusive));

    function menuFunc(menu: MenuType, sideBar: SidebarContextProps) {
        if(sideBar.isMobile) {
            sideBar.toggleSidebar();
        }
        if(sideBar.state == "collapsed") {
            return menu.url ? navigate(menu.url) : menu.onClick;
        } else {
            return menu.url ? navigate(menu.url) : menu.onClick;
        }
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                {/* Caso o menu tenha subtópicos */ menu.submenu ? (
                    <Collapsible defaultOpen>
                        <CollapsibleTrigger render={
                            <SidebarMenuButton onClick={()=>menuFunc(menu, sideBar)} isActive={menu.url?pathname.includes(menu.url):false} className="w-full justify-start">
                                {menu.icon}
                                <span>{menu.titulo}</span>
                            </SidebarMenuButton>
                        } />
                        <CollapsibleContent>
                            {rotasPermitidas && rotasPermitidas.map((s, index)=>(
                                <SubMenu key={index} submenu={s} />
                            ))}
                        </CollapsibleContent>
                    </Collapsible>
                    ):(
                        <SidebarMenuButton title={menu.titulo} isActive={pathname==menu.url} onClick={()=>menuFunc(menu, sideBar)}>
                            {menu.icon}
                            <span>{menu.titulo}</span>
                        </SidebarMenuButton>
                    )}
            </SidebarMenuItem>
        </SidebarMenu>
    )
}