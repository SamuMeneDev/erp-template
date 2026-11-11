import { Functions } from "@erp-template/util";
import z from "zod";

// Helper para converter string/null/undefined de forma segura
const parseNumber = (val: unknown) => {
    if (val === "" || val === null || val === undefined) return undefined;
    if (typeof val === "string") {
        const parsed = Number(val);
        return isNaN(parsed) ? val : parsed;
    }
    return val;
};

export const produtoEditSchema = z.object({
    nome: z.string().trim().min(3, { message: "O nome deve ter no mínimo 3 caracteres" }),
    codigo: z.string(),
    urlFoto: z.string(),
    descricao: z.string().trim().max(500, {error: "Tamanho máximo de caracteres atingido"}),

    quantAtual: z.preprocess(
        parseNumber, 
        z.number({ error: "Insira um valor válido" })
         .min(0, { message: "O valor mínimo é zero" })
    ),

    quantMinima: z.preprocess(
        parseNumber, 
        z.number({ error: "Insira um valor válido" })
         .min(1, { message: "O valor mínimo é um" })
    ),

    categoriaId: z.preprocess(
        parseNumber, 
        z.number({ error: "Insira um valor válido" }).positive().optional()
    ),

    markup: z.preprocess(
        (val) => {
            if (val === "" || val === null || val === undefined) return undefined;
            return Functions.floatFormat(val);
        },
        z.number({ error: "Insira um valor válido" })
         .min(1, { message: "O markup mínimo é um" })
    ),
});