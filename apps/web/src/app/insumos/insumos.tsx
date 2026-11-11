import { InsumoCreateDialog, InsumoListView } from "@/components/common/insumos";
import { Button } from "@/components/ui";
import { useDialog } from "@/hooks";
import { Plus } from "lucide-react";

/**
 * Tela para exibição e pesquisa dos insumos
 */
export default function Insumos() {
    /**
     * Estados do Dialog
     */
    const dialogCreate = useDialog(); 

    return (
        <section className="overflow-y-scroll px-14 p-10 w-full">
            <div className="flex items-center gap-3">
                <h1 className="text-2xl font-medium">Insumos</h1>
                <Button onClick={dialogCreate.open} variant="default" size="icon-sm">
                    <Plus />
                </Button>
            </div>
            {dialogCreate.isOpen && <InsumoCreateDialog  {...dialogCreate}/>}
            <InsumoListView />
        </section>
    )
}