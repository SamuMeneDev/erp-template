import type { BaseDialogProps } from "@/types"
import type { CategoriaChamadoResponse } from "@erp-template/types"
import { BaseDialog } from "../../_dialog"
import { Button, Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, DialogFooter, Field, FieldLabel, Input, Spinner, Textarea } from "@/components/ui"
import { useCategoriaChamadoFindAll, useChamadoCreate } from "@erp-template/services"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { chamadoCreateSchema } from "@erp-template/schemas"
import { useDebouncer, useToast } from "@/hooks"
import type z from "zod"

type ChamadoCreateDialogProps = BaseDialogProps & {

}

export function ChamadoCreateDialog({ ...dialogProps }: ChamadoCreateDialogProps) {

    const [_, debouce, update, isDebouncing] = useDebouncer("", 2000)

    const { data } = useCategoriaChamadoFindAll(new URLSearchParams(`nome=${debouce}`));
    const listaCategorias: CategoriaChamadoResponse[] = data?.data ?? [];

    const { register, setValue, handleSubmit, formState: { isValid, errors }} = useForm({
        resolver: zodResolver(chamadoCreateSchema),
    })

    const { mutate, isPending, isSuccess } = useChamadoCreate();

    function submit(data: z.infer<typeof chamadoCreateSchema>) {
        mutate(data);
    }

    useToast({
        config: {title: "Chamado editado com sucesso!", type: "success", timeout: 3000},
        isSuccess,
        before:()=>{dialogProps.close();}
    })

    return (
        <BaseDialog {...dialogProps}>
            <form onSubmit={handleSubmit(submit)}>
                <Field>
                    <FieldLabel>Titulo do chamado</FieldLabel>
                    <Input placeholder="Sugestão ou problema encontrado no sistema" {...register("titulo")}/>
                </Field>
                <Field>
                    <FieldLabel>Categoria do chamado</FieldLabel>
                    <Combobox items={listaCategorias} onValueChange={(c) => setValue("idCategoria", c?.id, { shouldValidate: true, shouldDirty: true })} itemToStringLabel={(i:CategoriaChamadoResponse)=>i.nome}>
                            <ComboboxInput aria-invalid={!!errors.idCategoria} onChange={(e)=>update(e.target.value)} onClear={()=>update("")} showClear placeholder="Buscar categoria" />
                            <ComboboxContent>
                                {(isPending || isDebouncing) && (
                                    <div className="flex justify-center">
                                        <Spinner />
                                    </div>
                                )}
                                <ComboboxList>
                                    {listaCategorias.map(c=>(
                                        <ComboboxItem key={c.id} value={c}>
                                            {c.nome}
                                        </ComboboxItem>
                                    ))}
                                </ComboboxList>
                                {listaCategorias.length < 1 && (
                                    <ComboboxEmpty>
                                        Nenhuma categoria encontrada
                                    </ComboboxEmpty>
                                )}
                            </ComboboxContent>
                        </Combobox>
                </Field>
                <Field>
                    <FieldLabel>Descrição do chamado</FieldLabel>
                    <Textarea placeholder="Descreva o problema ou sugestão" {...register("descricao")}/>
                </Field>
                <DialogFooter>
                    <Button variant="outline" onClick={dialogProps.close}>Cancelar</Button>
                    <Button disabled={isPending || !isValid } type="submit">
                        {isPending && <Spinner />}
                        Criar
                    </Button>
                </DialogFooter>
            </form>
        </BaseDialog>
    )
}