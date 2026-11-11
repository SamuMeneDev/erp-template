import z from "zod";
import {ETipoValorDesconto} from "@erp-template/types";
export const descontoPrecificacaoCreateSchema = z.object({
    nome: z.string().trim().min(3, {error: "O nome do desconto deve ter no mínimo 3 caracteres"}),
    valor: z.preprocess(val=>{
            if(typeof val === "string") {
                const format = val.replace(",", ".");
                return format === "" ? undefined : Number(format);
            }
            return val;
        }, z.number({error: "Insira um valor válido"}).positive({error: "O valor deve ser maior que zero"})),
    tipoValor: z.enum(ETipoValorDesconto),

})