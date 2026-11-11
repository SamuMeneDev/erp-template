import z from "zod";
import { StatusChamadoList } from "../../types/enumeration/StatusChamado";

export const chamadoStatusEditSchema = z.object({
    status: z.enum(StatusChamadoList, {error: "Insira um status válido"})
})