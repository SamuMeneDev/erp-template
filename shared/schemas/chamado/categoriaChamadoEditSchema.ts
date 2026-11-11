import z from "zod";

export const categoriaChamadoEditSchema = z.object({
    nome: z.string().nonempty({error: "O nome da categoria é obrigatório"}),
    urgencia: z.int().min(0, {error: "A urgência mínima é 0 (zero)"})
})