import { toast } from "@/components/ui"
import { useEffect } from "react";

/**
 * 
 */
type UseToastProps = {
    /**
     * Estado de controle do hook, indica quando uma notificação deve ser ativada novamente -
     * (Indicado o estado de isSucess da requisição).
     */
    isSuccess: boolean,
    
    /**
     * Função opcional que roda antes da criação do toast.
     */
    before?: () => void,

    /**
     * Função de callback opcional para quando o toast fechar.
     */
    after?: ()=>void,

    /**
     * Configuração do toast.
     */
    config?: {
        title?: string,
        type?: "success" | "info" | "warning" | "error",
        timeout?: number,
        priority?: "low" | "high" | undefined
    }
}

/**
 * Hook criado para facilitar a criação de notificações do tipo Toasta para feedback do usuário.
 */
export function useToast({ after, before, isSuccess, config = {timeout: 5000, title: "", type: "success"} }: UseToastProps) {
    useEffect(()=> {
        // Se a requisição deu certo (a variavel isSucess for verdadeira), fecha o Dialog e abre um alert para feedback do usuário.
        if(isSuccess) {
            if(before) before();
            toast.add({
                title: config.title || "",
                timeout: config.timeout || 5000,
                type: config.type || "success",
                priority: config.priority,
                onClose: after
            });
        }
    }, [isSuccess]);
}