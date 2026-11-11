import { useForm } from "react-hook-form";
import { useLogin } from "@erp-template/services";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod";
import { loginSchema } from "@erp-template/schemas";
import { Button, CardContent, CardFooter, Input, Spinner } from "@/components/ui";
import { useNavigate } from "react-router";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { DelayedLoading } from "../DelayedLoading";

export function LoginForm() {
    const { register, formState: {errors, isValid}, handleSubmit } = useForm({resolver: zodResolver(loginSchema), mode: "onTouched"});
    const navigate = useNavigate();
    const {mutate, isPending} = useLogin();

    function submit(form: z.infer<typeof loginSchema>) {
        mutate(form);
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <CardContent className="flex flex-col gap-2 pb-5">
                
                <Field className="gap-0">
                    <FieldLabel>Email</FieldLabel>
                    <div>
                        {errors.email && <FieldError className="text-xs">{errors.email.message}</FieldError>}
                        <Input
                            type="email"
                            placeholder="m@example.com"
                            aria-invalid={!!errors.email}
                            {...register("email")}
                        />
                    </div>
                </Field>
                    
                <Field className="gap-0">
                    <FieldLabel>Senha</FieldLabel>    
                    <div>
                        {errors.senha && <FieldError className="text-xs">{errors.senha.message}</FieldError>}
                        <Input
                            type="password"
                            placeholder="Digite sua senha"
                            aria-invalid={!!errors.senha}
                            {...register("senha")}
                        />
                    </div>
                </Field>
                
                <div className="flex justify-end">
                    <Button
                        onClick={()=>navigate("/esqueci-senha")}
                        variant="link">
                        Esqueci a senha
                    </Button>
                </div>
            </CardContent>
            <CardFooter>
                <Button disabled={isPending || !isValid} type="submit" className="w-full">
                    {isPending && <Spinner data-icon="inline-start" />}
                    Login
                </Button>
            </CardFooter>
            <DelayedLoading isPending={isPending} />
        </form>
    )
}