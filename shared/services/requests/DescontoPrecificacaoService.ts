import type { DescontoPrecificacaoCreateRequest, DescontoPrecificacaoEditRequest, DescontoPrecificacaoResponse} from "@erp-template/types";
import { keys } from "@erp-template/types";
import { api } from "../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useDescontoPrecCreate() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (request: DescontoPrecificacaoCreateRequest) => DescontoPrecificacaoService.create(request),
        onSuccess: (_, variables) => {
            if(variables.idPrecificacao) { // Se passou o id, é um desconto de precificação, logo
            //  Invalida o cache das precificações, contrário, invalida os descontos globais.
                queryClient.invalidateQueries({queryKey: keys.PRECIFICACAO_FINDALL});
            } else {
                queryClient.invalidateQueries({queryKey: keys.DESCONTO_GLOBAL});
            }
        }
    });
}

export function useDescontoGlobalFindAll() {
    return useQuery({
        queryKey: keys.DESCONTO_GLOBAL,
        queryFn: DescontoPrecificacaoService.findAllGlobal
    });
}

export function useDescontoPrecEdit(id: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (request: DescontoPrecificacaoEditRequest) => DescontoPrecificacaoService.edit(id, request),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: keys.PRECIFICACAO_FINDALL});
            queryClient.invalidateQueries({queryKey: keys.DESCONTO_GLOBAL});
        }
    })
}

export function useDescontoPrecDelete(id: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => DescontoPrecificacaoService.delete(id),
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey: keys.DESCONTO_GLOBAL});
            queryClient.invalidateQueries({queryKey: keys.PRECIFICACAO_FINDALL});
        },
    })
}

class DescontoPrecificacaoService {
    static async create(request: DescontoPrecificacaoCreateRequest) {
        const response = await api.post("/desconto-precificacao/create", request);
        return response;
    }

    static async findAllGlobal() {
        const response = await api.get<DescontoPrecificacaoResponse[]>("/desconto-precificacao/global/findAll");
        return response;
    }

    static async edit(id: number, request: DescontoPrecificacaoEditRequest) {
        const response = await api.patch(`/desconto-precificacao/${id}`, request);
        return response;
    }
    static async delete(id: number) {
        const response = await api.delete(`/desconto-precificacao/${id}`);
        return response;
    }
}