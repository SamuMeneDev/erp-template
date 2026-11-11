import z from "zod";

export const usuarioRegisterSchema = z.object({
    nome: z.string(),
    email: z.email({error: "Insira um email válido"}),
    senha: z.string()
    .min(6, {error: "A senha deve ter no mínimo 6 caracteres"}),
    //role: z.enum(UsuarioRoleList, {error: "Role inválido para o usuário"})
})