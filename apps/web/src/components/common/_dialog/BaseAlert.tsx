import { AlertDialog, AlertDialogContent } from "@/components/ui"
import type { BaseDialogProps } from "@/types"
import type { ReactNode } from "react"

type BaseAlertProps = BaseDialogProps & {
    children: ReactNode
}

export function BaseAlert({ children, isOpen }: BaseAlertProps) {
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                {children}
            </AlertDialogContent>
        </AlertDialog>
    )
}