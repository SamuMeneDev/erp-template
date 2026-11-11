import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter, AlertDialogTitle, Spinner } from "@/components/ui";
import { useToast } from "@/hooks";
import type { BaseDialogProps } from "@/types";
import { usePrecificacaoDelete } from "@erp-template/services";
import type { PrecificacaoResponse } from "@erp-template/types";
import { BaseAlert } from "../_dialog";

type PrecificacaoDeleteDialogProps = BaseDialogProps & {
    precificacao: PrecificacaoResponse
}

export function PrecificacaoDeleteDialog({ precificacao, ...dialogProps }: PrecificacaoDeleteDialogProps) {
        /**
         * Estados de requisição.
         */
        const { mutate, isPending, isSuccess, reset } = usePrecificacaoDelete(precificacao.id);
    
        /**
         * Feedback para o usuário após requisição.
         */
        useToast({before: ()=> {
            dialogProps.close();
            reset();
        }, isSuccess, config: {title: "Precificação excluido com sucesso!"}});
    return (
        <BaseAlert {...dialogProps}>
            <AlertDialogTitle>Confirmação</AlertDialogTitle>
            <p>Deseja mesmo excluir {precificacao.nome}?</p>
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