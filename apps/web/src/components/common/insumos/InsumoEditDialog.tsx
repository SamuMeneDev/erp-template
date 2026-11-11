import { Button, Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, DialogFooter, Field, FieldError, FieldGroup, FieldLabel, Input, Spinner } from "@/components/ui";
import { useDebouncer, useToast } from "@/hooks";
import type { BaseDialogProps } from "@/types";
import { insumoEditSchema } from "@erp-template/schemas";
import { useCategoriaInsumoFindAll, useInsumoEdit } from "@erp-template/services";
import type { CategoriaInsumoResponse } from "@erp-template/types";
import type { InsumoResponse } from "@erp-template/types/response/InsumoResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import { BaseDialog } from "../_dialog";

/**
 * Props do Formulário
 */
type InsumoEditFormProps = BaseDialogProps & {
    /**
     * Dados do insumo para alteração.
     */
    insumo: InsumoResponse;
}

export function InsumoEditDialog({insumo, ...dialogProps}: InsumoEditFormProps) {
    /**
     * Estados do formulário
     */
    const { handleSubmit, setValue, register, formState: {dirtyFields, errors, isValid} } = useForm({
        resolver: zodResolver(insumoEditSchema),
        defaultValues:{
            nome: insumo.nome, preco: insumo.preco, quantAtual: insumo.quantAtual, categoriaId: insumo.categoria?.id, urlFoto: insumo?.urlFoto ?? ""
        },
        mode: "onTouched"
    });

    const [_, debounce, update, isDebouncing] = useDebouncer(insumo.categoria?.nome ?? "", 2000);

    /**
     * Dados das categorias em cache.
     */
    const { data: dataCategorias } = useCategoriaInsumoFindAll(new URLSearchParams(`nome=${debounce}`));

    const listaCategoria: CategoriaInsumoResponse[] = dataCategorias?.data.content ?? [];

    /**
     * Estados da requisição
     */
    const { mutate, isPending, isSuccess, reset } = useInsumoEdit(insumo.id);

    function submit(request: z.infer<typeof insumoEditSchema>) {
        // filtra o objeto do formulário para manter apenas os campos que o usuário alterou de fato
        const camposAlterados = Object.fromEntries(
            Object.entries(request).filter(([key]) => dirtyFields[key as keyof z.infer<typeof insumoEditSchema>])
        );

        // Se não mecheu em nada nem roda requisição.
        if(Object.keys(camposAlterados).length === 0) {
            return;
        }

        // Manda somente os campos que foram alterados
        mutate(camposAlterados as z.infer<typeof insumoEditSchema>);

    }

    /**
     * Feedback para o usuário após requisição.
     */
    useToast({before: ()=> {
        dialogProps.close();
        reset();
    }, isSuccess, config: {title: "Insumo editado com sucesso!"}});

    return (
        <BaseDialog {...dialogProps}>
            <form onSubmit={handleSubmit(submit)}>
                <FieldGroup>
                    <Field>
                        <FieldLabel>Nome do insumo</FieldLabel>
                        <Input placeholder="Nome do insumo" aria-invalid={!!errors.nome} {...register("nome")} />
                        {errors.nome && <FieldError>{errors.nome.message}</FieldError>}
                    </Field>
                    <Field>
                        <FieldLabel>Imagem do insumo</FieldLabel>
                        <Input type="url" placeholder="URL da imagem do insumo" aria-invalid={!!errors.urlFoto} {...register("urlFoto")} />
                        {errors.urlFoto && <FieldError>{errors.urlFoto.message}</FieldError>}
                    </Field>
                    <Field>
                        <FieldLabel>Categoria do Insumo</FieldLabel>
                        <Combobox defaultValue={insumo.categoria} onValueChange={(e)=>setValue("categoriaId", e?.id, {shouldDirty:true, shouldValidate:true})} items={listaCategoria} itemToStringLabel={(e:CategoriaInsumoResponse)=>e.nome}>
                            <ComboboxInput onClear={()=>update("")} showClear onChange={(e)=>update(e.target.value)} placeholder="Buscar categoria" />
                            <ComboboxContent>
                                {(isPending || isDebouncing) && (
                                    <div className="flex justify-center">
                                        <Spinner />
                                    </div>
                                )}
                                <ComboboxList>
                                    {listaCategoria.map(c=>(
                                        <ComboboxItem key={c.id} value={c}>
                                            {c.nome}
                                        </ComboboxItem>
                                    ))}
                                </ComboboxList>
                                {listaCategoria.length < 1 && (
                                    <ComboboxEmpty>
                                        Nenhuma categoria encontrada
                                    </ComboboxEmpty>
                                )}
                            </ComboboxContent>
                        </Combobox>
                    </Field>
                    <div className="flex gap-3 justify-between">
                        <Field>
                            <FieldLabel>Quant. Atual</FieldLabel>
                            <Input type="number" min="0" placeholder="Ex.: 5" aria-invalid={!!errors.quantAtual} {...register("quantAtual")}/>
                            {errors.quantAtual && <FieldError>{errors.quantAtual.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel>Valor do insumo</FieldLabel>
                            <Input placeholder="Ex.: R$" aria-invalid={!!errors.preco} {...register("preco")}/>
                            {errors.preco && <FieldError>{errors.preco.message}</FieldError>}
                        </Field>
                    </div>
                </FieldGroup>
                <DialogFooter>
                    <Button onClick={dialogProps.close} variant="outline">Cancelar</Button>
                    <Button disabled={isPending || !isValid } type="submit">
                        {isPending && <Spinner />}
                        Salvar
                    </Button>
                </DialogFooter>
            </form>
        </BaseDialog>
    )
}