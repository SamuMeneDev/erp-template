import type { UsuarioRoles } from "../../enumeration/UsuarioRoles";

export interface UsuarioRegisterRequest {
    nome: string,
    email: string,
    senha: string,
    role: UsuarioRoles
}