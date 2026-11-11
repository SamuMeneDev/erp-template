
import z from "zod";
export const categoriaProdutoEditSchema = z.object({
    nome: z.string().trim().min(3, {error: "O nome da categoria deve ter no mínimo 3 caracteres"})
});