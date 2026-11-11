import { UsuarioListView, UsuarioRegisterDialog } from "@/components/common/admin";
import { Button } from "@/components/ui";
import { useDialog } from "@/hooks";

export default function Usuarios() {

    const dialogRegister = useDialog();

    return (
        <section className="p-5 w-full max-w-xl">
            <div className="flex gap-2 items-center">
                <h2 className="text-xl font-medium">Usuários do sistema</h2>
                <Button onClick={dialogRegister.open} variant="outline" >Cadastrar usuário</Button>
            </div>
            <UsuarioListView />
            {dialogRegister.isOpen && <UsuarioRegisterDialog {...dialogRegister}/>}
        </section>
    )
}