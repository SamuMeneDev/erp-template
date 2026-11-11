import type { BaseDialogProps } from "@/types";
import { useAdminSolicitarRedefinicaoSenha } from "@erp-template/services";
import type { UsuarioResponse } from "@erp-template/types";
import { BaseDialog } from "../_dialog";
import { Button, DialogFooter, Field, FieldError, FieldGroup, FieldLabel, Input, Spinner } from "@/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usuarioPasswordEditSchema } from "@erp-template/schemas";
import type z from "zod";
import { useToast } from "@/hooks";

type UsuarioSolicitacaoSenhaDialogProps = BaseDialogProps & {
    usuario: UsuarioResponse;
}
export function UsuarioSolicitacaoSenhaDialog({usuario, ...dialogProps}: UsuarioSolicitacaoSenhaDialogProps) {

    const { mutate, isPending, isSuccess } = useAdminSolicitarRedefinicaoSenha(usuario.id);

    const {handleSubmit, register, formState: { errors, isValid }} = useForm({
        resolver: zodResolver(usuarioPasswordEditSchema),
        mode: "onTouched"
    });

    function submit(data: z.infer<typeof usuarioPasswordEditSchema>) {
        mutate(data);
    }

    useToast({
        isSuccess,
        config: {timeout: 3000, type: "info", title: "A senha do usuário foi alterada, compartilhe com ele e em seu próximo login, ele redefinirá a senha!"},
        before: dialogProps.close
    });

    return (
        <BaseDialog title={`Alterar senha de ${usuario.nome}`} {...dialogProps}>
            <form onSubmit={handleSubmit(submit)}>
                <FieldGroup>
                    <Field>
                        <FieldLabel>Digite a senha provisória</FieldLabel>
                        <Input aria-invalid={!!errors.senha} placeholder="Senha provisória do usuario" {...register("senha")}/>
                        {errors.senha && <FieldError>{errors.senha.message}</FieldError>}
                    </Field>
                    <Field>
                        <FieldLabel>Confirme a senha provisória</FieldLabel>
                        <Input aria-invalid={!!errors.senhaConfirmacao} placeholder="Confirmação da senha" {...register("senhaConfirmacao")} />
                        {errors.senha && <FieldError>{errors.senha.message}</FieldError>}
                    </Field>
                </FieldGroup>
                <DialogFooter>
                    <Button variant="outline" onClick={dialogProps.close}>Cancelar</Button>
                    <Button disabled={isPending || !isValid} type="submit">
                        {isPending && <Spinner />}
                        Alterar senha
                    </Button>
                </DialogFooter>
            </form>
        </BaseDialog>
    )
}