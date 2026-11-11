import { Button, DialogFooter, Field, FieldError, FieldLabel, Input, Spinner } from "@/components/ui";
import { useToast } from "@/hooks";
import type { BaseDialogProps } from "@/types";
import { precificacaoEditSchema } from "@erp-template/schemas";
import { usePrecificacaoEdit } from "@erp-template/services";
import type { PrecificacaoResponse } from "@erp-template/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import { BaseDialog } from "../_dialog";

type PrecificacaoEditDialogProps = BaseDialogProps & {
    precificacao: PrecificacaoResponse
}

export function PrecificacaoEditDialog({ precificacao, ...dialogProps }: PrecificacaoEditDialogProps) {

    const { handleSubmit, reset, register, formState: { errors, isValid, isDirty } } =
    useForm({
        resolver: zodResolver(precificacaoEditSchema),
        mode: "onTouched",
        defaultValues: { nome: precificacao.nome }
    })

    const { mutate, isSuccess, isPending } = usePrecificacaoEdit(precificacao.id);

    function submit(data: z.infer<typeof precificacaoEditSchema>) {
        mutate(data);
    }
    
    /**
     * Feedback para o usuário após requisição.
     */
    useToast({before: ()=> {
        dialogProps.close();
        reset();
    }, isSuccess, config: {title: "Precificação editada com sucesso!"}});

    return (
        <BaseDialog {...dialogProps}>
            <form onSubmit={handleSubmit(submit)}>
                <Field>
                    <FieldLabel>Nome do insumo</FieldLabel>
                    <Input placeholder="Nome da precificação" aria-invalid={!!errors.nome} {...register("nome")} />
                    {errors.nome && <FieldError>{errors.nome.message}</FieldError>}
                </Field>
                <DialogFooter>
                    <Button onClick={dialogProps.close} variant="outline">Cancelar</Button>
                    <Button disabled={isPending || !isValid || !isDirty } type="submit">
                        {isPending && <Spinner />}
                        Salvar
                    </Button>
                </DialogFooter>
            </form>
        </BaseDialog>
    )
}