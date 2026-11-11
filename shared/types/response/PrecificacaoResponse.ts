import type {Status, DescontoPrecificacaoResponse} from "../";

export interface PrecificacaoResponse {
    id: number,
    nome: string,
    dataCriacao: Date,
    dataModificacao: Date,
    status: Status
    descontos: DescontoPrecificacaoResponse[]
}