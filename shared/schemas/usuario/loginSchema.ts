import {z} from "zod";
export const loginSchema = z.object({
    email: z.email({error: "Insira um email válido"}).trim(),
    senha: z.string().trim().min(6, {error: "A senha deve ter no mínimo 6 caracteres"})
});