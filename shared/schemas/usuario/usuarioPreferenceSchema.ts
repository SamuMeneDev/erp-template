import {z} from "zod";

export const usuarioPreferenceSchema = z.object({
    nome: z.string().min(3, {error: "O nome deve ter no mínimo 3 caracteres"})
})