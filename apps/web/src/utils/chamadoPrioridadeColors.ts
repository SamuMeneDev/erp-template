
import type { StatusChamado } from "@erp-template/types";

const coresPrioridades=[
    "text-red-500",
    "text-amber-500",
    "text-green-500",
    "text-blue-500"
];

export const chamadoPrioridadeColors = (urgencia: number) => {
    if(urgencia < 4) {
        return coresPrioridades[urgencia];
    } else {
        return coresPrioridades[coresPrioridades.length-1];
    }
}


export function corStatusChamado(status: StatusChamado) {
    switch (status) {
        case "PENDENTE":
            return "text-stone-500";
        case "EM_ANDAMENTO":
            return "text-blue-500";
        case "CONCLUIDO":
            return "text-green-500";
    }
}