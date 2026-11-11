import type { UsuarioRoles } from "@erp-template/types"
import type { ReactNode } from "react"

/**
 * Tipagem dos grupos de ações da sidebar da dashboard.
 */
export interface GroupType {
    titulo: string,
    menu: MenuType[],
    exclusive?: UsuarioRoles[]
}

/**
 * Atributos base de menus e submenus.
 */
export interface BaseMenuType {
    titulo: string,
    url?: string,
    onClick?: () => void,
    exclusive?: UsuarioRoles[]
}

/**
 * Tipagem dos menus de grupos da sidebar.
 */
export interface MenuType extends BaseMenuType {

    icon: ReactNode,
    submenu?: SubMenuType[]

}

/**
 * Tipagem dos eventuais submenus da sidebar.
 */
export interface SubMenuType extends BaseMenuType {

}