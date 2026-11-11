import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter, AlertDialogTitle, Spinner } from "@/components/ui";
import { useToast } from "@/hooks";
import type { BaseDialogProps } from "@/types";
import { useProdutoDelete } from "@erp-template/services";
import type { ProdutoResponse } from "@erp-template/types";
import { BaseAlert } from "../_dialog";

type InsumoDeleteDialogProps = BaseDialogProps & {
    produto: ProdutoResponse;
}

/**
 * Componente para confirmação de exclusão
 */
export function ProdutoDeleteDialog({ produto, ...dialogProps }: InsumoDeleteDialogProps) {

    const { mutate, isPending, isSuccess, reset } = useProdutoDelete(produto.id);

    // Feedback para o usuário após requisição.
    useToast({before: ()=> {
        dialogProps.close();
        reset();
    }, isSuccess, config: {title: "Produto excluido com sucesso!"}});

    return (
        <BaseAlert {...dialogProps}>
            <AlertDialogTitle>Confirmação</AlertDialogTitle>
            <p>Deseja mesmo excluir {produto.nome}?</p>
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