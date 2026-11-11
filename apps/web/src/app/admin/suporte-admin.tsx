import { CategoriaChamadoListView } from "@/components/common/admin";
import { SuporteAdminListView } from "@/components/common/admin/SuporteAdminListView";

export default function SuporteAdmin() {
    return (
        <section className="overflow-y-scroll px-7 p-4 w-full">
            <div className="flex flex-col gap-3">
                <h1 className="text-2xl font-medium">Suporte aos usuários</h1>
            </div>
            <div className="flex justify-between px-20">
                <SuporteAdminListView />
                <CategoriaChamadoListView />
            </div>
        </section>
    )
}