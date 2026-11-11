import { useState } from "react";

/**
 * Hook que controla o estado de um Dialog
 * 
 * @param initialState Valor de estado do Dialog
 */
export function useDialog(initialState = false) {
    /**
     * Estado do dialog (aberto ou fechado => true | false)
     */
    const [isOpen, setOpen] = useState(initialState);


    /**
     * Abrir um dialog
     */
    const open = () => setOpen(true); 
    /**
     * Fechar um dialog
     */
    const close = () => setOpen(false);

    return { open, close, isOpen }
}