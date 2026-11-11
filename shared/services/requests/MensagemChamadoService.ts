import type { MensagemChamadoCreateRequest, MensagemChamadoEditRequest, MensagemChamadoResponse, PagedResponse } from "@erp-template/types";
import { api } from "../api";
import { keys } from "@erp-template/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useMensagemChamadoFindAll(idChamado: number) {
    return useQuery({
        queryKey: [...keys.MENSAGEM_CHAMADO_FINDALL, idChamado],
        queryFn: ()=>MensagemChamadoService.findAll(idChamado)
    });
}
export function useMensagemChamadoSend(idChamado: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (request: MensagemChamadoCreateRequest)=>MensagemChamadoService.send(idChamado, request),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: [...keys.MENSAGEM_CHAMADO_FINDALL, idChamado]});
            queryClient.invalidateQueries({queryKey: keys.CHAMADO_FINDALL});
        }
    });
}
export function useMensagemChamadoDelete(id: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ()=>MensagemChamadoService.delete(id),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: keys.MENSAGEM_CHAMADO_FINDALL});
            queryClient.invalidateQueries({queryKey: keys.CHAMADO_FINDALL});
        }
    });
}
export function useMensagemChamadoEdit(id: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (request: MensagemChamadoEditRequest)=>MensagemChamadoService.edit(id, request),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: keys.MENSAGEM_CHAMADO_FINDALL});
            queryClient.invalidateQueries({queryKey: keys.CHAMADO_FINDALL});
        }
    });
}

class MensagemChamadoService {
    static async findAll(idChamado: number) {
        const response = await api.get<PagedResponse<MensagemChamadoResponse>>(`/chamado/mensagem/${idChamado}/findAll`);
        return response;
    }
    static async send(idChamado: number, request: MensagemChamadoCreateRequest) {
        const response = await api.post(`/chamado/mensagem/${idChamado}/send`, request);
        return response;
    }
    static async delete(id: number) {
        const response = await api.delete(`/chamado/mensagem/delete/${id}`);
        return response;
    }
    static async edit(id: number, request: MensagemChamadoEditRequest) {
        const response = await api.patch(`/chamado/mensagem/edit/${id}`, request);
        return response;
    }
}