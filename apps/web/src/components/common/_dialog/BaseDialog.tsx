import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui"
import type { BaseDialogProps } from "@/types"
import type {  ReactNode } from "react"




type BaseDialogComponentProps = BaseDialogProps & {
    children: ReactNode,
    title?: string
}

/**
 * Componente que encapsula parte comum de todos os dialogs do sistema, deixando apenas para ser desenvolvido a estrutura
 * específica de cada dialog
 */
export function BaseDialog({ children, title, isOpen, close }: BaseDialogComponentProps) {
    return (
        <Dialog onOpenChange={close} open={isOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}