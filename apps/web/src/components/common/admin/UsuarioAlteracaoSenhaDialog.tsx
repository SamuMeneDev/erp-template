import type { BaseDialogProps } from "@/types";
import { BaseDialog } from "../_dialog";
import { useAuth } from "@erp-template/contexts";
import { Button, DialogFooter, Field, FieldError, FieldGroup, FieldLabel, Input, Spinner } from "@/components/ui";
import { useAlterarSenha } from "@erp-template/services";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usuarioPasswordEditSchema } from "@erp-template/schemas";
import type z from "zod";

type UsuarioAlteracaoSenhaDialogProps = BaseDialogProps & {

}

export function UsuarioAlteracaoSenhaDialog(dialogProps: UsuarioAlteracaoSenhaDialogProps) {
    const {usuario} = useAuth()
    
    const { mutate, isPending } = useAlterarSenha(usuario?.id ?? 0);

    const { handleSubmit, register,  formState: {errors, isValid} } = useForm({
        resolver: zodResolver(usuarioPasswordEditSchema),
        mode: "onTouched"
    })

    function submit(data: z.infer<typeof usuarioPasswordEditSchema>) {
        mutate(data);
    }
    return (
        <BaseDialog title="Alterar senha" {...dialogProps}>
            <p>Você está usando uma senha provisória. Crie uma nova senha para continuar</p>
            <form onSubmit={handleSubmit(submit)}>
                <FieldGroup>
                    <Field>
                        <FieldLabel>Digite a senha</FieldLabel>
                        <Input aria-invalid={!!errors.senha} placeholder="Insira a nova senha" {...register("senha")}/>
                        {errors.senha && <FieldError>{errors.senha.message}</FieldError>}
                    </Field>
                    <Field>
                        <FieldLabel>Confirme a senha</FieldLabel>
                        <Input aria-invalid={!!errors.senhaConfirmacao} placeholder="Confirmação da senha" {...register("senhaConfirmacao")} />
                        {errors.senha && <FieldError>{errors.senha.message}</FieldError>}
                    </Field>
                </FieldGroup>
                <DialogFooter>
                    <Button disabled={isPending || !isValid} type="submit">
                        {isPending && <Spinner />}
                        Alterar senha
                    </Button>
                </DialogFooter>
            </form>
        </BaseDialog>
    )
}