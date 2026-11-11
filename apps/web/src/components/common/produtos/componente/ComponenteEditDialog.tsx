import { Button, Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, DialogFooter, Field, FieldError, FieldGroup, FieldLabel, Input, Spinner } from "@/components/ui";
import { useDebouncer, useToast } from "@/hooks";
import type { BaseDialogProps } from "@/types";
import { componenteEditSchema } from "@erp-template/schemas";
import { useComponenteEdit, useInsumoFindAll } from "@erp-template/services";
import type { ComponenteResponse, InsumoResponse } from "@erp-template/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import { BaseDialog } from "../../_dialog";

type ComponenteEditDialogProps = BaseDialogProps & {
    componente: ComponenteResponse
}

export function ComponenteEditDialog({ componente, ...dialogProps }: ComponenteEditDialogProps) {

    /**
     * Estados do formulario.
     */
    const {handleSubmit, setValue, register, formState: {errors, isValid, isDirty}, reset} = useForm({
        resolver: zodResolver(componenteEditSchema), mode: "all",
        defaultValues: {insumoId: componente.insumo.id, quantidade: componente.quantidade}
        
    });

    // Debouncer para filtrar lista de insumos
    const [_, debouce, update, isDebouncing] = useDebouncer(componente.insumo.nome, 2000);

    /**
     * Dados dos insumos no cache.
     */
    const { data: dataInsumo, isPending: isPendingInsumo } = useInsumoFindAll(new URLSearchParams(`nome=${debouce}`));

    const listaInsumo: InsumoResponse[] = dataInsumo?.data.content ?? [];

    /**
     * Estados de requisição.
     */
    const { mutate, isPending, isSuccess } = useComponenteEdit(componente.id);

    function submit(data: z.infer<typeof componenteEditSchema>) {
        mutate(data);
    }

    useToast({before:()=>{
        dialogProps.close();
        reset();
    }, isSuccess, config: {title: "Alterações salvas"}});
    
    return (
        <BaseDialog {...dialogProps}>
            <form onSubmit={handleSubmit(submit)}>
                <FieldGroup>
                    <Field aria-invalid={!!errors.insumoId}>
                        <FieldLabel>Selecione o insumo</FieldLabel>
                        <Combobox defaultValue={componente.insumo} onValueChange={(e)=>setValue("insumoId", e?.id, {shouldValidate:true, shouldDirty: true})} items={listaInsumo} itemToStringValue={(i:InsumoResponse)=>String(i.id)} itemToStringLabel={(i:InsumoResponse)=>i.nome}>
                            <ComboboxInput onClear={()=>update("")} aria-invalid={!!errors.insumoId} showClear onChange={(e)=>update(e.target.value)} placeholder="Buscar insumo" />
                            <ComboboxContent>
                                {(isDebouncing || isPendingInsumo)&& (
                                    <div className="flex justify-center">
                                        <Spinner />
                                    </div>
                                )}
                                <ComboboxList>
                                    {listaInsumo.map(i=>(
                                        <ComboboxItem key={i.id} value={i}>
                                            {i.nome}
                                        </ComboboxItem>
                                    ))}
                                </ComboboxList>
                                {listaInsumo.length < 1 && (
                                    <ComboboxEmpty>
                                    Nenhum insumo encontrado
                                    </ComboboxEmpty>
                                )}
                            </ComboboxContent>
                        </Combobox>
                        {errors.insumoId && <FieldError>{errors.insumoId.message}</FieldError>}
                    </Field>
                    <Field>
                        <FieldLabel>Quantidade desse insumo</FieldLabel>
                        <Input type="number" aria-invalid={!!errors.quantidade} min="1" {...register("quantidade", {valueAsNumber: true})}/>
                        {errors.quantidade && <FieldError>{errors.quantidade.message}</FieldError>}
                    </Field>
                </FieldGroup>
            
                <DialogFooter>
                    <Button onClick={dialogProps.close} variant="outline">Cancelar</Button>
                    <Button disabled={isPending || !isValid || !isDirty} type="submit">
                        <span>Salvar</span>
                    </Button>
                </DialogFooter>
            </form>
        </BaseDialog>
    )
}