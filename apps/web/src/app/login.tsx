import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/common";


export default function Login() {
    return (
        <section>
            <div className="flex mt-10 justify-center items-center">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                            Insira seu email e senha para entrar na sua conta
                        </CardDescription>
                    </CardHeader>
                    <LoginForm />
                </Card>
            </div>
        </section>
    )
}