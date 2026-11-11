import z from "zod";

export const insumoCreateSchema = z.object({
    nome: z.string().trim().min(3, {error: "O nome deve ter no mínimo 3 caracteres"}),
    preco: z.preprocess(val=>{
        if(typeof val === "string") {
            const format = val.replace(",", ".");
            return format === "" ? undefined : Number(format);
        }
        return val;
    }, z.number({error: "Insira um valor válido"}).nonnegative({error: "O valor mínimo é zero"})),
    categoriaId: z.preprocess(val=>{
        if(typeof val === "string") {
            return val === "" ? undefined : Number(val);
        }
        return val;
    }, z.number().positive().optional()),


    quantAtual: z.preprocess(val=>{
        if(typeof val === "string") {
            return val === "" ? undefined : Number(val);
        }
        return val;
    }, z.int({error: "Insira um valor válido"}).nonnegative({error: "O valor mínimo é zero"})),
    urlFoto: z.string(),
})