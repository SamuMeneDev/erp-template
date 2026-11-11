import z from "zod";

export const componenteCreateSchema = z.object({
    insumoId: z.preprocess(val=>{
        if(typeof val === "string") {
            return val === "" ? undefined : Number(val);
        }
        return val;
    }, z.number({error: "Escolha um insumo"}).positive()),
    
    // produtoId (Vindo das props)
    
    quantidade: z.preprocess(val=>{
        if(typeof val === "string") {
            return val === "" ? undefined : Number(val);
        }
        return val;
    }, z.int({error: "Insira um valor inteiro"}).min(1, {error: "O valor mínimo é 1"}))
})