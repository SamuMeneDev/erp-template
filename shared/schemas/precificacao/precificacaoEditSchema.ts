import z from "zod";
export const precificacaoEditSchema = z.object({
    nome: z.string({error: "Insira um nome para a precificação"})
    .trim().min(3, {error: "O nome deve ter no mínimo 3 caracteres"})
})