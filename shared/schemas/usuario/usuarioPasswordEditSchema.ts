import z from "zod";

export const usuarioPasswordEditSchema = z.object({
    senha: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    senhaConfirmacao: z.string().min(6, { message: "A senha de confirmação deve ter no mínimo 6 caracteres" }),
}).refine((data) => data.senha === data.senhaConfirmacao, {error: "As senhas não coincidem", path: ["senhaConfirmacao"]})