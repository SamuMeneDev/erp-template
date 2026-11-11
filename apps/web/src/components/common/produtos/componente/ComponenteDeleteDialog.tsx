import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter, AlertDialogTitle, Spinner } from "@/components/ui";
import { useToast } from "@/hooks";
import type { BaseDialogProps } from "@/types";
import { useComponenteDelete } from "@erp-template/services";
import type { ComponenteResponse } from "@erp-template/types/response/ComponenteResponse";
import { BaseAlert } from "../../_dialog";

type ComponenteDeleteDialogProps = BaseDialogProps & {
    componente: ComponenteResponse;
}

/**
 * Componente para confirmação de exclusão
 */
export function ComponenteDeleteDialog({ componente, ...dialogProps }: ComponenteDeleteDialogProps) {

    /**
     * Estados de requisição.
     */
    const { mutate, isPending, isSuccess, reset } = useComponenteDelete(componente.id);

    /**
     * Feedback para o usuário após requisição.
     */
    useToast({before: ()=> {
        dialogProps.close();
        reset();
    }, isSuccess, config: {title: "insumo desvinculado com sucesso!"}});

    return (
        <BaseAlert {...dialogProps}>
            <AlertDialogTitle>Confirmação</AlertDialogTitle>
            <p>Deseja mesmo remover este insumo?</p>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={dialogProps.close}>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={()=>mutate()} disabled={isPending}>
                    {isPending && <Spinner />}
                    Excluir
                </AlertDialogAction>
            </AlertDialogFooter>
        </BaseAlert>
    )
}