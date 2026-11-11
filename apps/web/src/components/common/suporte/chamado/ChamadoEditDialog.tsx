import type { BaseDialogProps } from "@/types"
import type { CategoriaChamadoResponse, ChamadoResponse } from "@erp-template/types"
import { BaseDialog } from "../../_dialog"
import { Button, Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, DialogFooter, Field, FieldLabel, Input, Spinner, Textarea } from "@/components/ui"
import { useCategoriaChamadoFindAll, useChamadoEdit } from "@erp-template/services"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { chamadoEditSchema } from "@erp-template/schemas"
import { useDebouncer, useToast } from "@/hooks"
import type z from "zod"

type ChamadoEditDialogProps = BaseDialogProps & {
    chamado: ChamadoResponse
}

export function ChamadoEditDialog({ chamado, ...dialogProps }: ChamadoEditDialogProps) {

    const [_, debouce, update, isDebouncing] = useDebouncer(chamado.categoria?.nome || "", 2000)

    const { data } = useCategoriaChamadoFindAll(new URLSearchParams(`nome=${debouce}`));
    const listaCategorias: CategoriaChamadoResponse[] = data?.data ?? [];

    const { register, setValue, handleSubmit, formState: { isValid, isDirty, errors }} = useForm({
        resolver: zodResolver(chamadoEditSchema),
        defaultValues: {
            descricao: chamado?.descricao ?? "", 
            idCategoria: chamado.categoria.id,
            titulo: chamado.titulo
        }
    })

    const { mutate, isPending, isSuccess } = useChamadoEdit(chamado.id);

    function submit(data: z.infer<typeof chamadoEditSchema>) {
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
                    <Combobox defaultValue={chamado.categoria} items={listaCategorias} onValueChange={(c) => setValue("idCategoria", c?.id, { shouldValidate: true, shouldDirty: true })} itemToStringLabel={(i:CategoriaChamadoResponse)=>i.nome}>
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
                    <Button disabled={isPending || !isValid || !isDirty} type="submit">Editar</Button>
                </DialogFooter>
            </form>
        </BaseDialog>
    )
}