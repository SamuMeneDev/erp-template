import { Functions } from "@erp-template/util";
import  { z } from "zod";

export const produtoCreateSchema = z.object({
    nome: z.string().trim().min(3, {error: "O nome deve ter no mínimo 3 caracteres"}),
    codigo: z.string().trim(),
    descricao: z.string().trim().max(500, {error: "Tamanho máximo de caracteres atingido"}).optional(),
    
    quantAtual: z.preprocess(val=>{
        if(typeof val === "string") {
            return val === "" ? undefined : Number(val);
        }
        return val;
    }, z.int({error: "Insira um valor válido"}).min(0, {error: "O valor mínimo é zero"})),
    
    markup: z.preprocess(val=>Functions.floatFormat(val),
        z.number({error: "Insira um valor válido"}).min(1, {error: "O markup mínimo é um"})),
    
    quantMinima: z.preprocess(val=>{
        if(typeof val === "string") {
            return val === "" ? undefined : Number(val);
        }
        return val;
    }, z.int({error: "Insira um valor válido"}).min(1, {error: "O valor mínimo é um"})),
    
    urlFoto: z.string().optional(),
    categoriaId: z.preprocess(val=>{
        if(typeof val === "string") {
            return val === "" ? undefined : Number(val);
        }
        return val;
    }, z.number().positive().optional()),
});