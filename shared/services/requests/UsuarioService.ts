import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type { UsuarioEditRequest, TokenResponse, UsuarioLoginRequest, UsuarioResponse, UsuarioPasswordEditRequest } from "@erp-template/types";
import { keys } from "@erp-template/types";
import { api } from "../api";

/**
 * Faz requisição de autenticação (login no sistema)
 */
export function useLogin() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: (request: UsuarioLoginRequest) => UsuarioService.login(request),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: keys.ME});
        }

    });
    return mutate;
}

/**
 * Busca o usuário autenticado, usado também para hidratar o AuthContext.tsx
 */
export function useMe() {
    return useQuery({
        queryKey: keys.ME,
        queryFn: UsuarioService.me,
        staleTime: 1000 * 60 * 15,
        gcTime: 1000 * 60 * 60,
    });
}

/**
 * Função que desloga o usuário, invalidando o cookie HTTP e o cache.
 */
export function useLogout() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: UsuarioService.logout,
        onSuccess: () => {
            queryClient.setQueryData(keys.ME, null);
        }
        
    });
}

export function useAlterarSenha(idUsuario: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (request: UsuarioPasswordEditRequest) => UsuarioService.alterarSenha(idUsuario, request),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey: keys.ME});
        }
    });
}

export function useEdit() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (request: UsuarioEditRequest) => UsuarioService.edit(request),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: keys.ME});
        }
    });
}

class UsuarioService {
    static async login(request: UsuarioLoginRequest) {
        const response = await api.post<TokenResponse>("/usuario/login", request);
        return response;
    }
    static async me() {
        const response = await api.get<UsuarioResponse>("/usuario/me");
        return response;
    }
    static async logout() {
        const response = await api.post("/usuario/logout");
        return response;
    }

    static async edit(request: UsuarioEditRequest) {
        const response = await api.patch("/usuario/edit", request);
        return response;
    }

    static async alterarSenha(idUsuario: number, request: UsuarioPasswordEditRequest) {
        const response = await api.patch(`/usuario/alterar-senha/${idUsuario}`, request);
        return response;
    }
}