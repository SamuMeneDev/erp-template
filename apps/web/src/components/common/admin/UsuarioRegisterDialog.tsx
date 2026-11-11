import { Button, DialogFooter, Field, FieldError, FieldGroup, FieldLabel, Input, Spinner } from "@/components/ui";
import { useToast } from "@/hooks";
import type { BaseDialogProps } from "@/types";
import { usuarioRegisterSchema } from "@erp-template/schemas";
import { useUsuarioRegister } from "@erp-template/services";
import type { UsuarioRegisterRequest } from "@erp-template/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BaseDialog } from "../_dialog";

type UsuarioRegisterDialogProps = BaseDialogProps & {}

/**
 * Formulário de cadastro de usuarios (usado pelo admin)
 */
export function UsuarioRegisterDialog(dialogProps: UsuarioRegisterDialogProps) {
    /**
     * Estados do formulário
     */
    const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm({resolver: zodResolver(usuarioRegisterSchema), mode: "onTouched"});
    
    /**
     * Estados da request
     */
    const { mutate, isPending, isSuccess } = useUsuarioRegister();

    function submit(data: z.infer<typeof usuarioRegisterSchema>) {
        const request = data as UsuarioRegisterRequest;

        request.role = "USUARIO"; // Garantir que é usuário.
        mutate(request);
    }

    /**
     * Feedback para o usuário após requisição.
     */
    useToast({before: ()=> {
        dialogProps.close();
        reset();
    }, isSuccess, config: {title: "Usuario cadastrado com sucesso!"}});

    return (
        <BaseDialog title="Cadastrar Usuario" {...dialogProps}>
            <form onSubmit={handleSubmit(submit)}>
                <FieldGroup>
                    <Field>
                        <FieldLabel>Nome do usuário</FieldLabel>
                        <Input placeholder="Nome do usuário" aria-invalid={!!errors.nome} {...register("nome")} />
                        {errors.nome && <FieldError>{errors.nome.message}</FieldError>}
                    </Field>
                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input placeholder="email@example.com" type="email" aria-invalid={!!errors.email} {...register("email")} />
                        {errors.email && <FieldError>{errors.email.message}</FieldError>}                    
                    </Field>
                    <Field>
                        <FieldLabel>Senha</FieldLabel>
                        <Input placeholder="Senha do usuário" type="password" aria-invalid={!!errors.senha} {...register("senha")} />
                        {errors.senha && <FieldError>{errors.senha.message}</FieldError>}                    
                    </Field>
                </FieldGroup>
                <DialogFooter>
                    <Button onClick={dialogProps.close} variant="outline">Cancelar</Button>
                    <Button type="submit" disabled={isPending || !isValid}>
                        {isPending && <Spinner />}
                        Cadastrar Usuário
                    </Button>
                </DialogFooter>
            </form>
        </BaseDialog>
    )
}