import z from "zod";

export const mensagemChamadoEditSchema = z.object({
    mensagem: z.string({error: "Insira a mensagem"})
})