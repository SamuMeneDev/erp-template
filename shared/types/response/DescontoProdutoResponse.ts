import type { Desconto, Status } from "..";

export interface DescontoProdutoResponse extends Desconto {
        id: number,
        nome: string,
        dataCriacao: Date,
        dataModificacao: Date,
        status: Status
}