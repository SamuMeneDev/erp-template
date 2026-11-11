import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter, AlertDialogTitle, Spinner } from "@/components/ui";
import { useToast } from "@/hooks";
import type { BaseDialogProps } from "@/types";
import { useDescontoPrecDelete } from "@erp-template/services";
import type { DescontoPrecificacaoResponse } from "@erp-template/types";
import { BaseAlert } from "../../_dialog";

type DescontoPrecificacaoDeleteDialogProps = BaseDialogProps & {
    desconto: DescontoPrecificacaoResponse
}

/**
 * Dialog de confirmação de exclusão de descontos.
 */
export function DescontoPrecificacaoDeleteDialog({ desconto, ...dialogProps }: DescontoPrecificacaoDeleteDialogProps) {

        /**
         * Estados de requisição.
         */
        const { mutate, isPending, isSuccess, reset } = useDescontoPrecDelete(desconto.id);
    
        /**
         * Feedback para o usuário após requisição.
         */
        useToast({before: ()=> {
            dialogProps.close();
            reset();
        }, isSuccess, config: {title: "Desconto excluido com sucesso!"}});

    return (
        <BaseAlert {...dialogProps}>
            <AlertDialogTitle>Confirmação</AlertDialogTitle>
            <p>Deseja mesmo excluir {desconto.nome}?</p>
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