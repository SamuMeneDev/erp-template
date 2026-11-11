import type { BaseDialogProps } from "@/types"
import { StatusChamadoList, type ChamadoResponse } from "@erp-template/types"
import { BaseDialog } from "../../_dialog"
import { Button, DialogFooter, Field, FieldError, FieldLabel, NativeSelect, NativeSelectOption } from "@/components/ui"
import { useStatusChamadoEdit } from "@erp-template/services"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { chamadoStatusEditSchema } from "@erp-template/schemas"
import type z from "zod"
import { useToast } from "@/hooks"

type ChamadoEditStatusDialogProps = BaseDialogProps & {
    chamado: ChamadoResponse
}

export function ChamadoEditStatusDialog({ chamado, ...dialogProps }: ChamadoEditStatusDialogProps) {

    const { mutate, isPending, isSuccess } = useStatusChamadoEdit(chamado.id);

    const {register, handleSubmit, formState: { isValid, isDirty, errors }} = useForm({
        resolver: zodResolver(chamadoStatusEditSchema),
        defaultValues: {status: chamado.status},
        mode: "onTouched"
    })

    function submit(data: z.infer<typeof chamadoStatusEditSchema>) {
        mutate(data);
    }

    useToast({
        isSuccess,
        config: {title: "Status alterado com sucesso!", timeout: 3000, type: "success"},
        before: ()=>{ dialogProps.close(); }
    })

    return (
        <BaseDialog title="Alterar status do chamado" {...dialogProps}>
            <form onSubmit={handleSubmit(submit)}>
                <Field>
                    <FieldLabel>Status do chamado</FieldLabel>
                    <NativeSelect {...register("status")}>
                        {StatusChamadoList.map(s=>(
                            <NativeSelectOption key={s} value={s}>{s}</NativeSelectOption>
                        ))}
                    </NativeSelect>
                    {errors.status && <FieldError>{errors.status.message}</FieldError>}
                </Field>
                <DialogFooter>
                    <Button variant="outline" onClick={dialogProps.close} >Cancelar</Button>
                    <Button disabled={isPending || !isValid || !isDirty} type="submit">Salvar</Button>
                </DialogFooter>
            </form>
        </BaseDialog>
    )
}