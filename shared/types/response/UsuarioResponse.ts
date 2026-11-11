import type { UsuarioRoles } from "../enumeration/UsuarioRoles";

export interface UsuarioResponse {
    id: number,
    nome: string,
    role: UsuarioRoles;
    mudarSenha: boolean;
}