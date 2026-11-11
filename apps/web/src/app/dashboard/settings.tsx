import { RedefinirSenha, UserPreferences } from "@/components/common";
import { useAuth } from "@erp-template/contexts";

export default function Settings() {
    const { usuario } = useAuth();

    return (
        <section className="p-5 w-full">
            <div className="flex flex-col">
                <h1 className="text-2xl font-medium">Configurações</h1>
                <div className="flex flex-col sm:w-2/6 gap-5">
                    <UserPreferences className="flex flex-col col-start-5 col-span-6 gap-3" />
                </div>
                {usuario && usuario.role=="ADMIN" && (
                    <RedefinirSenha />
                )}
            </div>
        </section>
    )
}