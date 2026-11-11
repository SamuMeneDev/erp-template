import { Button, Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, DialogFooter, Field, FieldError, FieldGroup, FieldLabel, Input, Spinner } from "@/components/ui";
import { useDebouncer, useToast } from "@/hooks";
import type { BaseDialogProps } from "@/types";
import { insumoCreateSchema } from "@erp-template/schemas";
import { useCategoriaInsumoFindAll, useInsumoCreate } from "@erp-template/services";
import type { CategoriaInsumoResponse } from "@erp-template/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BaseDialog } from "../_dialog";

type InsumoCreateDialogProps = BaseDialogProps & {}

/**
 * Formulário de cadastro de insumos
 */
export function InsumoCreateDialog(dialogProps: InsumoCreateDialogProps) {
    /**
     * Estados do formulário
     */
    const {register, setValue, handleSubmit, formState: {errors, isValid}, reset} = useForm({resolver: zodResolver(insumoCreateSchema), mode: "onTouched"});
    

    const [_, debounce, update, isDebouncing] = useDebouncer("", 2000);

    /**
     * Dados das categorias em cache.
     */
    const { data: dataCategorias } = useCategoriaInsumoFindAll(new URLSearchParams(`nome=${debounce}`));

    const listaCategoria: CategoriaInsumoResponse[] = dataCategorias?.data.content ?? [];
    

    /**
     * Estados da request
     */
    const { mutate, isPending, isSuccess } = useInsumoCreate();

    function submit(data: z.infer<typeof insumoCreateSchema>) {
        mutate(data);
    }

    /**
     * Feedback para o usuário após requisição.
     */
    useToast({before: ()=> {
        dialogProps.close();
        reset();
    }, isSuccess, config: {title: "Insumo cadastrado com sucesso!"}});

    return (
        <BaseDialog title="Cadastrar Insumo" {...dialogProps}>
            <form onSubmit={handleSubmit(submit)}>
                <FieldGroup>
                    <Field>
                        <FieldLabel>Nome do insumo</FieldLabel>
                        <Input placeholder="Ex.: Insumo A" aria-invalid={!!errors.nome} {...register("nome")} />
                        {errors.nome && <FieldError>{errors.nome.message}</FieldError>}
                    </Field>
                    <Field>
                            <FieldLabel>Imagem do insumo</FieldLabel>
                            <Input type="url" placeholder="URL da imagem do insumo" aria-invalid={!!errors.urlFoto} {...register("urlFoto")} />
                    </Field>
                    <Field>
                        <FieldLabel>Categoria do insumo</FieldLabel>
                        <Combobox onValueChange={(e)=>setValue("categoriaId", e?.id, {shouldDirty:true, shouldValidate:true})} items={listaCategoria} itemToStringLabel={(e:CategoriaInsumoResponse)=>e.nome}>
                            <ComboboxInput onClear={()=>update("")} showClear onChange={(e)=>update(e.target.value)} placeholder="Buscar categoria" />
                            <ComboboxContent>
                                {(isPending || isDebouncing) && (
                                    <Spinner />
                                )}
                                <ComboboxList>
                                    {listaCategoria.map(l=>(
                                        <ComboboxItem key={l.id} value={l}>
                                            {l.nome}
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
                    <div className="flex justify-between gap-3">
                        <Field>
                            <FieldLabel>Quant. Atual</FieldLabel>
                            <Input type="number" min="0" placeholder="Ex.: 1" aria-invalid={!!errors.quantAtual} {...register("quantAtual")} />
                            {errors.quantAtual && <FieldError>{errors.quantAtual.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel>Valor do insumo</FieldLabel>
                            <Input placeholder="Ex.: R$ " aria-invalid={!!errors.preco} {...register("preco")} />
                            {errors.preco && <FieldError>{errors.preco.message}</FieldError>}
                        </Field>
                    </div>
                </FieldGroup>
                <DialogFooter>
                    <Button onClick={dialogProps.close} variant="outline">Cancelar</Button>
                    <Button type="submit" disabled={isPending || !isValid}>
                        {isPending && <Spinner />}
                        Cadastrar Insumo
                    </Button>
                </DialogFooter>
            </form>
        </BaseDialog>
    )
}