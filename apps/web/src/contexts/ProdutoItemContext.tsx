import type { ProdutoResponse } from "@erp-template/types"
import { createContext, useContext, type ReactNode } from "react"

type ProdutoItemContextType = {
    produto: ProdutoResponse
}


const ProdutoItemContext = createContext<ProdutoItemContextType>({} as ProdutoItemContextType);

type ProdutoItemProviderProps = {
    children: ReactNode
    produto: ProdutoResponse
}

/**
 * Contexto usado para passar o objeto vindo da requisição de um produto para ou componentes
 * filhos na composição.
 */
export function ProdutoItemProvider(props: ProdutoItemProviderProps) {
    const produto = props.produto;

    return (
        <ProdutoItemContext.Provider value={{produto}}>
            {props.children}
        </ProdutoItemContext.Provider>
    )
}

export function useProdutoItemContext() {
    const context = useContext(ProdutoItemContext);
    if(context === undefined) throw new Error("O contexto deve ser usado dentro de um ProdutoItemProvider");

    return context;
}