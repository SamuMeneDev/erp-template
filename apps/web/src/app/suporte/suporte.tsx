import { ChamadoCreateDialog } from "@/components/common/suporte/chamado/ChamadoCreateDialog";
import { SuporteListView } from "@/components/common/suporte/SuporteListView";
import { Button } from "@/components/ui";
import { useDialog } from "@/hooks";

export default function Suporte() {
    const createDialog = useDialog();
    return (
        <section className="overflow-y-scroll px-7 p-4 w-full">
            <div className="flex items-center gap-3 mb-7">
                <h1 className="text-2xl font-medium">Suporte</h1>
                <Button variant="outline" onClick={createDialog.open}>
                    Abrir um chamado
                </Button>
            </div>
            <SuporteListView />
            {createDialog.isOpen && <ChamadoCreateDialog {...createDialog} />}
        </section>
    )
}