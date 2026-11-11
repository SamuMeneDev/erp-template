import type { PrecificacaoCreateRequest, PrecificacaoEditRequest, PrecificacaoResponse, PrecificacaoValorResponse } from "@erp-template/types";
import { keys } from "@erp-template/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

export function usePrecificacaoFindAll() {
    return useQuery({
        queryKey: keys.PRECIFICACAO_FINDALL,
        queryFn: PrecificacaoService.findAll
    });
}

export function usePrecificacaoValores(idProduto: number) {
    return useQuery({
        queryFn: ()=>PrecificacaoService.valores(idProduto),
        queryKey: [...keys.PRECIFICACAO_VALORES, idProduto]
    })
}

export function usePrecificacaoCreate() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (request: PrecificacaoCreateRequest) => PrecificacaoService.create(request),
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey: keys.PRECIFICACAO_FINDALL});
            queryClient.invalidateQueries({queryKey: keys.PRECIFICACAO_VALORES});
        }
    })
}

export function usePrecificacaoDelete(id: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => PrecificacaoService.delete(id),
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey: keys.PRECIFICACAO_FINDALL});
            queryClient.invalidateQueries({queryKey: keys.PRECIFICACAO_VALORES});
        }
    });
}

export function usePrecificacaoEdit(id: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (request: PrecificacaoEditRequest) => PrecificacaoService.edit(id, request),
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey: keys.PRECIFICACAO_FINDALL});
            queryClient.invalidateQueries({queryKey: keys.PRECIFICACAO_VALORES});
        }
    });
}

class PrecificacaoService {
    static async findAll() {
        const response = await api.get<PrecificacaoResponse[]>("/precificacao/findAll");
        return response;
    }

    static async valores(idProduto: number) {
        const response = await api.get<PrecificacaoValorResponse[]>(`/precificacao/valores/${idProduto}`);
        return response;
    }

    static async create(request: PrecificacaoCreateRequest) {
        const response = await api.post("/precificacao/create", request);
        return response;
    }

    static async edit(id: number, request: PrecificacaoEditRequest) {
        const response = await api.patch(`/precificacao/${id}`, request);
        return response;
    }

    static async delete(id: number) {
        const response = await api.delete(`/precificacao/${id}`);
        return response;
    }
}