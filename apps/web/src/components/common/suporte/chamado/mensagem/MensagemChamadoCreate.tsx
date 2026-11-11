import { Field, FieldError, FieldLabel, InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@/components/ui"
import { useToast } from "@/hooks"

import { mensagemChamadoCreateSchema } from "@erp-template/schemas"
import { useMensagemChamadoSend } from "@erp-template/services"
import type { ChamadoResponse } from "@erp-template/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type z from "zod"

type MensagemChamadoCreateProps = {
    chamado: ChamadoResponse
}

export function MensagemChamadoCreate({chamado}: MensagemChamadoCreateProps) {

    const { mutate, isPending, isSuccess } = useMensagemChamadoSend(chamado.id);

    const { register, reset, handleSubmit, formState: { errors } } = useForm({resolver: zodResolver(mensagemChamadoCreateSchema)})

    function submit(data: z.infer<typeof mensagemChamadoCreateSchema>) {
        mutate(data);
    }

    useToast({
        config: {title: "Mensagem enviada com sucesso!", timeout: 5000, type: "success"},
        isSuccess,
        before: ()=> {reset();}
    })

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col">
                <Field aria-invalid={!!errors.mensagem}>
                    <FieldLabel>Escreva uma mensagem nessa chamado</FieldLabel>
                    <InputGroup>
                        <InputGroupTextarea aria-invalid={!!errors.mensagem} placeholder="Digite sua mensagem" {...register("mensagem")}/>
                        <InputGroupAddon className="flex justify-end" align="block-end">
                            <InputGroupButton type="submit" disabled={isPending} variant="default" size="sm">
                                Enviar
                            </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>
                    {errors?.mensagem && <FieldError>{errors.mensagem.message}</FieldError>}
                </Field>
            </div>
        </form>
    )
}