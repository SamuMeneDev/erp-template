import z from "zod";
import {ETipoValorDesconto} from "@erp-template/types";
import { Functions } from "@erp-template/util";
export const descontoPrecificacaoEditSchema = z.object({
    nome: z.string().trim().min(3, {error: "O nome da categoria deve ter no mínimo 3 caracteres"}),
    valor: z.preprocess(val=>Functions.floatFormat(val),
        z.number({error: "Insira um valor válido"}).positive({error: "O valor deve ser maior que zero"})),
    tipoValor: z.enum(ETipoValorDesconto),

})