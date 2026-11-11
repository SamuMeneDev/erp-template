import type { UsuarioResponse } from "./UsuarioResponse";

export interface MensagemChamadoResponse {
    id: number,
    mensagem: string,
    autor: UsuarioResponse,
    dataCriacao: string,
    dataModificacao: string,
    excluido: boolean
}