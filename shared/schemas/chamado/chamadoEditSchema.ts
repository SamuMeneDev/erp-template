import z from "zod";

export const chamadoEditSchema = z.object({
    idCategoria: z.preprocess(val=>{
        if(typeof val === "string") {
            return val === "" ? undefined : Number(val);
        }
        return val;
    }, z.number({error: "O ID da categoria está inválido"}).positive({error: "O id do chamado deve ser positivo"})),
    titulo: z.string({error: "Insira o título do chamado"}),
    descricao: z.string()
})