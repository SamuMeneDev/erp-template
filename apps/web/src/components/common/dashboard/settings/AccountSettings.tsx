import { Button, FieldLabel, Input, Spinner } from "@/components/ui";
import { usuarioPreferenceSchema } from "@erp-template/schemas";
import { useEdit, useMe } from "@erp-template/services";
import { zodResolver } from "@hookform/resolvers/zod";
import type { HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";

/**
 * Painel com as configurações da conta do utilizador
 */
type AccountSettingsProps = HTMLAttributes<HTMLDivElement> & {

}


export function AccountSettings({...props}: AccountSettingsProps) {
    const {data} = useMe();
    const { mutate, isPending } = useEdit()
    
    const { register, handleSubmit, formState: {defaultValues, isValid}, watch } = useForm({
        resolver: zodResolver(usuarioPreferenceSchema),
        defaultValues: {nome: data?.data.nome || ""},
        mode: "all"
    })

    function submit(data: z.infer<typeof usuarioPreferenceSchema>) {
        mutate(data);
    }
    
    return (
        <div {...props}>
            <h2 className="text-stone-500">Configurações da conta</h2>
            <div>
                <form onSubmit={handleSubmit(submit)} className="flex gap-2">
                    <FieldLabel>Nome</FieldLabel>
                    <Input placeholder="Digite seu nome" {...register("nome")}/>
                    <Button
                        disabled={defaultValues?.nome==watch().nome || !isValid || isPending}
                        type="submit"
                    >Salvar {isPending && <Spinner />}</Button>
                </form>
            </div>
        </div>
    )
}