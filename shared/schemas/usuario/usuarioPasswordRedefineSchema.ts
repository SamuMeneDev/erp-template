import z from "zod";

export const usuarioPasswordRedefineSchema = z.object({
    email: z.email({ message: "E-mail inválido" })
})