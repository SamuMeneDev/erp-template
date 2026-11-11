import { Button, DialogFooter, Field, FieldError, FieldGroup, FieldLabel, Input, Spinner } from "@/components/ui";
import { useToast } from "@/hooks";
import type { BaseDialogProps } from "@/types";
import { categoriaProdutoCreateSchema } from "@erp-template/schemas";
import { useCategoriaProdutoCreate } from "@erp-template/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import { BaseDialog } from "../../_dialog";

type CategoriaProdutoCreateDialogProps = BaseDialogProps &{
}

/**
 * Componente Dialog para cadastrar um produto.
 */
export function CategoriaProdutoCreateDialog(dialogProps: CategoriaProdutoCreateDialogProps) {

    // Estados do formulário
    const { handleSubmit, formState: { errors, isValid }, register, reset } = useForm({resolver: zodResolver(categoriaProdutoCreateSchema), mode: "onTouched"})

    // Estados da requisição
    const { mutate, isPending, isSuccess } = useCategoriaProdutoCreate();

    function submit(data: z.infer<typeof categoriaProdutoCreateSchema>) {
        mutate(data);
        reset();
    }

    useToast({before:()=>{
        dialogProps.close();
    }, isSuccess, config: {title: "Categoria criada com sucesso!"}});

    return (
        <BaseDialog title="Criar categoria" {...dialogProps}>
            <form onSubmit={handleSubmit(submit)}>
                <FieldGroup>
                    <Field>
                        <FieldLabel>Nome da categoria</FieldLabel>
                        <Input placeholder="Categoria" aria-invalid={!!errors.nome} {...register("nome")}/>
                        {errors.nome && <FieldError>{errors.nome.message}</FieldError>}
                    </Field>
                </FieldGroup>

                <DialogFooter>
                    <Button onClick={dialogProps.close} variant="outline">Cancelar</Button>
                    <Button disabled={isPending || !isValid} type="submit">
                        {isPending && <Spinner />}
                        <span>Criar categoria</span>
                    </Button>
                </DialogFooter>
            </form>
        </BaseDialog>
    )
}