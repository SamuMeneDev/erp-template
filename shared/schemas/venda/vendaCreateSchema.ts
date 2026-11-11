import z from "zod";

export const vendaCreateSchema = z.object({
    precificacaoId: z.int({error: "Nenhuma precificação válida selecionada"}),
    /*selecoesVenda: z.array(z.object({
        produtoId: z.int({error: "Insira um ID válido"}),
        quantidade: z.int().min(1, {error: "A deve ter pelo menos 1 item"})
    })).min(1, {error: "Um item deve ser selecionado pelo menos"})*/
})