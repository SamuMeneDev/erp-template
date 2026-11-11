import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter, AlertDialogTitle, Spinner } from "@/components/ui";
import { useToast } from "@/hooks";
import type { BaseDialogProps } from "@/types";
import { useCategoriaInsumoDelete } from "@erp-template/services";
import type { CategoriaInsumoResponse } from "@erp-template/types";
import { BaseAlert } from "../../_dialog";

type CategoriaInsumoDeleteDialogProps = BaseDialogProps & {
    categoria: CategoriaInsumoResponse;
}

/**
 * Componente de dialog para confirmar exclusão de uma categoria.
 */
export function CategoriaInsumoDeleteDialog({categoria, ...dialogProps }: CategoriaInsumoDeleteDialogProps) {

    // Estados de requisição.
    const { mutate, isPending, isSuccess, reset } = useCategoriaInsumoDelete(categoria.id);

    // Feedback para o usuário após requisição.
    useToast({before: ()=> {
        dialogProps.close();
        reset();
    }, isSuccess, config: {title: "Categoria excluida com sucesso!"}});

    return (
        <BaseAlert {...dialogProps}>
            <AlertDialogTitle>Confirmação</AlertDialogTitle>
            <p>Deseja mesmo excluir {categoria.nome}?</p>
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