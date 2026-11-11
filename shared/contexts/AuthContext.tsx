import type { UsuarioResponse } from "@erp-template/types"
import {useLogout, useMe} from "@erp-template/services";
import { createContext, useContext, type ReactNode } from "react";

type AuthContextType = {
    usuario?: UsuarioResponse,
    logout: ()=> Promise<void>,
    isAuth: boolean,
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({ isAuth: false } as AuthContextType);


type AuthProviderProps = {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const { data: usuario, isLoading } = useMe();
    const { mutate } = useLogout();
    async function logout() {
        mutate();
        //await authStorage.clearToken() # (Mobile)
    }


    return (
        <AuthContext.Provider value={{isAuth: !!usuario, isLoading, usuario: usuario?.data, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if(context === undefined) throw new Error("O AuthContext não está em um provider");
    return context;
}