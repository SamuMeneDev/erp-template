import type { CategoriaChamadoResponse,  } from "./CategoriaChamadoResponse";
import type { StatusChamado } from "../enumeration/StatusChamado";
import type { UsuarioResponse } from "./UsuarioResponse"; 

export interface ChamadoResponse {
    id: number,
    autor: UsuarioResponse,
    categoria: CategoriaChamadoResponse,
    titulo: string,
    descricao?: string,
    status: StatusChamado
    dataCriacao: string,
    dataModificacao: string,
}