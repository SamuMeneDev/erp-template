import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar";
import { Menu } from "./Menu";
import type { GroupType } from "@/types/SidebarGroup";
import { useMe } from "@erp-template/services";
import { temAcesso } from "@/utils/groupData";

type GroupProps = {
    group: GroupType
}

export function Group({group}: GroupProps) {

    const {data} = useMe();

    const rotasPermitidas = group.menu.filter(m=>temAcesso(data?.data.role, m.exclusive));

    return (
        <SidebarGroup>
            <SidebarGroupLabel>{group.titulo}</SidebarGroupLabel> 
            <SidebarGroupContent>
                {rotasPermitidas.map((m, index)=>(
                    <Menu key={index} menu={m} />
                ))}
            </SidebarGroupContent>
        </SidebarGroup>
    )
}