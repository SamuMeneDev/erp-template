import type { InsumoResponse } from "./InsumoResponse";

export interface ComponenteResponse {
    id: number;
    insumo: InsumoResponse;
    quantidade: number;
}