import { Button, DialogFooter, Field, FieldError, FieldLabel, Input } from "@/components/ui";
import { useToast } from "@/hooks";
import type { BaseDialogProps } from "@/types";
import { precificacaoCreateSchema } from "@erp-template/schemas";
import { usePrecificacaoCreate } from "@erp-template/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import { BaseDialog } from "../_dialog";

type PrecificacaoCreateDialogProps = BaseDialogProps & {
}

export function PrecificacaoCreateDialog(dialogProps: PrecificacaoCreateDialogProps) {

    const { handleSubmit, register, reset, formState: {isValid, errors}} = 
    useForm({
        resolver: zodResolver(precificacaoCreateSchema),
        mode: "onTouched"
    })

    const { mutate, isPending, isSuccess } = usePrecificacaoCreate();

    function submit(data: z.infer<typeof precificacaoCreateSchema>) {
        mutate(data);
    }

    /**
     * Feedback para o usuário após requisição.
     */
    useToast({before: ()=> {
        dialogProps.close();
        reset();
    }, isSuccess, config: {title: "Precificação criada com sucesso!"}});

    return (
        <BaseDialog title="Criar Precificação" {...dialogProps}>
            <form onSubmit={handleSubmit(submit)}>
                <Field>
                    <FieldLabel>Nome da precificação</FieldLabel>
                    <Input placeholder="Ex.: Plataforma A" aria-invalid={!!errors.nome} {...register("nome")} />
                    {errors.nome && <FieldError>{errors.nome.message}</FieldError>}
                </Field>
                <DialogFooter>
                    <Button onClick={dialogProps.close} type="button" variant="outline">Cancelar</Button>
                    <Button type="submit" disabled={isPending || !isValid} >
                        Criar precificação
                    </Button>
                </DialogFooter>
            </form>
        </BaseDialog>
    )
}