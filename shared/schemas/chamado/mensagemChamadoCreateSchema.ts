import z from "zod";

export const mensagemChamadoCreateSchema = z.object({
    mensagem: z.string({error: "Insira a mensagem"}).min(3, {error: "A mensagem deve ter no mínimo 3 caracteres"})
})