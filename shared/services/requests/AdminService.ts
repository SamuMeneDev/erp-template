import type { ChamadoResponse, ChamadoStatusEditRequest, UsuarioPasswordEditRequest, UsuarioRegisterRequest, UsuarioResponse } from "@erp-template/types";
import { keys } from "@erp-template/types";
import { api } from "../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useUsuarioFindAll() {
    return useQuery({
        queryKey: keys.USUARIO_FINDALL,
        queryFn: AdminService.findAllUsuario
    });
}

export function useUsuarioRegister() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (request: UsuarioRegisterRequest) => AdminService.registerUsuario(request),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: keys.USUARIO_FINDALL});
        }
    })
}
export function useAdminChamadoFindAll() {
    return useQuery({
        queryKey: [...keys.ADMIN_CHAMADO_FINDALL, ...keys.CHAMADO_FINDALL],
        queryFn: ()=> AdminService.findAllChamado()
    })
}
export function useStatusChamadoEdit(idChamado: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (request: ChamadoStatusEditRequest)=>AdminService.alterarStatusChamado(idChamado, request),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: keys.ADMIN_CHAMADO_FINDALL})
        }
    })

}
export function useAdminSolicitarRedefinicaoSenha(idUsuario: number) {
    return useMutation({
        mutationFn: (request: UsuarioPasswordEditRequest) => AdminService.solicitarRedefinicaoSenha(idUsuario, request)
    });
}

class AdminService {
    static async findAllUsuario() {
        const response = await api.get<UsuarioResponse[]>("/admin/findAll-usuario");
        return response;
    }

    static async registerUsuario(request: UsuarioRegisterRequest) {
        const response = await api.post("/admin/register-usuario", request);
        return response;
    }
    static async findAllChamado() {
        const response = await api.get<ChamadoResponse[]>("/admin/findAll-chamado");
        return response;
    }
    static async alterarStatusChamado(idChamado: number, request: ChamadoStatusEditRequest) {
        const response = await api.patch(`/admin/status-chamado/${idChamado}`, request);
        return response;
    }
    static async solicitarRedefinicaoSenha(idUsuario: number, request: UsuarioPasswordEditRequest) {
        const response = await api.patch(`/admin/redefinir-acesso/${idUsuario}`, request);
        return response;
    }
}