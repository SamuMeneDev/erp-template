import type { BaseDialogProps } from "@/types"
import type { MensagemChamadoResponse } from "@erp-template/types"
import { BaseDialog } from "../../../_dialog"
import { Button, DialogFooter, Field, FieldError, FieldLabel, Textarea } from "@/components/ui"
import { useMensagemChamadoEdit } from "@erp-template/services"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { mensagemChamadoEditSchema } from "@erp-template/schemas"
import type z from "zod"
import { useToast } from "@/hooks"

type MensagemEditDialogProps = BaseDialogProps & {
    mensagem: MensagemChamadoResponse
}

export function MensagemEditDialog({ mensagem, ...dialogProps }: MensagemEditDialogProps) {

    const { mutate, isPending, isSuccess } = useMensagemChamadoEdit(mensagem.id);

    const { handleSubmit, register, formState: {errors, isDirty} }
    = useForm({
        resolver: zodResolver(mensagemChamadoEditSchema),
        defaultValues: {mensagem: mensagem.mensagem}
    })

    useToast({
        config: {title: "Mensagem editada com sucesso!", timeout: 3000, type: "success"},
        isSuccess,
        before: ()=>{ dialogProps.close(); }
    });

    function submit(data: z.infer<typeof mensagemChamadoEditSchema>) {
        mutate(data);
    }

    return (
        <BaseDialog title="Editar Mensagem" {...dialogProps}>
            <form onSubmit={handleSubmit(submit)}>
                <Field>
                    <FieldLabel>Mensagem</FieldLabel>
                    <Textarea placeholder="Digite sua mensagem" {...register("mensagem")}/>
                    {errors.mensagem && <FieldError>{errors.mensagem.message}</FieldError>}
                </Field>
                <DialogFooter>
                    <Button onClick={dialogProps.close} variant="outline">Cancelar</Button>
                    <Button disabled={isPending || !isDirty} type="submit">Editar</Button>
                </DialogFooter>
            </form>
        </BaseDialog>
    )
}