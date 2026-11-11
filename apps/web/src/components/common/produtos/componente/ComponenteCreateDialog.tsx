import { Button, Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, DialogFooter, Field, FieldError, FieldGroup, FieldLabel, Input, Spinner } from "@/components/ui";
import { useProdutoItemContext } from "@/contexts";
import { useDebouncer, useToast } from "@/hooks";
import type { BaseDialogProps } from "@/types";
import { componenteCreateSchema } from "@erp-template/schemas";
import { useComponenteCreate, useInsumoFindAll } from "@erp-template/services";
import type { ComponenteCreateRequest, InsumoResponse } from "@erp-template/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { BaseDialog } from "../../_dialog";

type ComponenteCreateDialogProps = BaseDialogProps & {
}

/**
 * Dialog de cadastro de insumo a um produto (componente).
 */
export function ComponenteCreateDialog(dialogProps: ComponenteCreateDialogProps) {
    
    // Debouncer combobox insumo
    const [_, debouce, update, isDebouncing] = useDebouncer("", 2000)

    /**
     * Dados dos insumos disponíveis em cache.
     */
    const { data: dataInsumo, isPending: isPendingInsumo } = useInsumoFindAll(new URLSearchParams(`nome=${debouce}`));

    const listaInsumo: InsumoResponse[] = dataInsumo?.data.content ?? [];

    /**
     * Estados do formulário.
     */
    const { register, setValue, formState: {errors, isValid}, handleSubmit, reset } = useForm({resolver: zodResolver(componenteCreateSchema), mode: "onTouched"})

    /**
     * Estado de requisição.
     */
    const { mutate, isPending, isSuccess } = useComponenteCreate();
    
    /**
     * Dados do produto passado pelo contexto para os componentes na composição.
     */
    const { produto } = useProdutoItemContext();

    function submit(data: z.infer<typeof componenteCreateSchema>) {
        const request: ComponenteCreateRequest = {...data, produtoId: produto.id};
        
        mutate(request);
    }

    /**
     * Caso a requisição seja bem sucedida, envia feedback ao usuário.
     */
    useToast({before:()=>{
        dialogProps.close();
        reset();
    },isSuccess, config: {title: "Insumo adicionado com sucesso!"}})

    return (
        <BaseDialog title="Adicionar Insumo" {...dialogProps}>
            <form onSubmit={handleSubmit(submit)}>
                <FieldGroup>
                    <Field aria-invalid={!!errors.insumoId}>
                        <FieldLabel>Insumo</FieldLabel>
                        <Combobox onValueChange={(e)=>setValue("insumoId", e?.id, {shouldValidate: true})} items={listaInsumo} itemToStringValue={(i:InsumoResponse)=>String(i.id)} itemToStringLabel={(i:InsumoResponse)=>i.nome}>
                            <ComboboxInput onClear={()=>update("")} aria-invalid={!!errors.insumoId} showClear onChange={(e)=>update(e.target.value)} placeholder="Buscar insumo" />
                            <ComboboxContent>
                                {(isDebouncing || isPendingInsumo) && (
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
                        <Input placeholder="Ex.: 1 ou +" type="number" aria-invalid={!!errors.quantidade} min="1" {...register("quantidade")}/>
                        {errors.quantidade && <FieldError>{errors.quantidade.message}</FieldError>}
                    </Field>
                </FieldGroup>
            
                <DialogFooter>
                    <Button onClick={dialogProps.close} variant="outline">Cancelar</Button>
                    <Button disabled={isPending || !isValid} type="submit">
                        {isPending ? <Spinner /> : <Plus />}
                        <span>Adicionar</span>
                    </Button>
                </DialogFooter>
            </form>
        </BaseDialog>
    )
}