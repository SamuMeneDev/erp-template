import type { GroupType } from "@/types";
import type { UsuarioRoles } from "@erp-template/types";
import { Box, ChartLine, CircleQuestionMark, Cog, DollarSign, Gift, MessageSquareCode, MessageSquareDot, ShoppingCart, UsersRound } from "lucide-react";


/**
 * Estrutura dos menus e grupos de menus na sidebar da dashboard
 */
export const groupData: GroupType[] = [
       {
        exclusive: ["ADMIN"],
        titulo: "Admin",
        menu: [
            {

                icon: <UsersRound />,
                titulo: "Usuarios",
                url: "/admin/usuarios"
            },
            {
                icon: <MessageSquareCode />,
                url: "/admin/suporte",
                titulo: "Suporte aos usuários"
            }
        ]
    },
    {
        titulo: "Sistema",
        menu: [
            {
                icon: <ChartLine />,
                titulo: "Dashboard",
                url: "/dashboard"
            },
            {
                titulo: "Produtos",
                url: "/produtos",
                icon: <Gift />,
                submenu: [
                    {titulo: "Produtos", url: "/produtos"},
                    {titulo: "Categoria de produtos", url: "/produtos/categorias"},
                ]
            },
            {
                titulo: "Insumos",
                url: "/insumos",
                icon: <Box />,
                submenu: [
                    {titulo: "Insumos", url: "/insumos"},
                    {titulo: "Categoria de insumos", url: "/insumos/categorias"},
                ]
            },
            {
                titulo: "Precificação",
                icon: <DollarSign />,
                url: "/precificacao"
            },
            {
                titulo: "Vendas",
                icon: <ShoppingCart />,
                url: "/venda"
            },
            
        ]
    },
    {
        titulo: "Suporte e Configurações",
        menu: [
            {
                exclusive: ["USUARIO"],
                icon: <CircleQuestionMark/>,
                titulo: "Perguntas Frequentes",
            },
            {
                exclusive: ["USUARIO"],
                icon: <MessageSquareDot/>,
                url: "/suporte",
                titulo: "Suporte",
            },
            {
                icon: <Cog/>,
                titulo: "Configurações",
                url:"/dashboard/settings"
            },
        ]
    }
]

/**
 * Função que verifica , dada as roles de um menu ou grupo e, dada a role do usuário, o acesso do usuário
 * a um grupo.
 * 
 * @param userRole Role do usuário.
 * @param exclusive Grupo de roles permitidas
 * @returns Retorna `true` se o usuário tiver permissão.
 */
export function temAcesso(userRole?: UsuarioRoles, exclusive?: UsuarioRoles[]): boolean {
    if(!exclusive || !userRole || exclusive.length === 0) return true;


    return exclusive.includes(userRole);
}