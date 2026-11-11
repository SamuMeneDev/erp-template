import { Card, CardDescription, CardHeader, CardTitle, Button } from "@/components/ui";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function EsqueciSenha() {

    const navigate = useNavigate();

    return (
        <section>
            <div className="flex mt-10 justify-center items-center">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Button onClick={()=>navigate(-1)} variant="ghost" size="icon-sm">
                                <ChevronLeft />
                            </Button>
                            <CardTitle>Esqueceu a senha?</CardTitle>
                        </div>
                        <CardDescription>
                            Aviso: A redefinição de senha automatizada está sendo relizada pelo administrador. para
                            redefinir sua senha, entre em contato nos canais de comunicação do sistema.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </section>
    )
}