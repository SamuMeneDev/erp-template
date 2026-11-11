import { VendaListView } from "@/components/common/venda";
import { VendaCreateDialog } from "@/components/common/venda/VendaCreateDialog";
import { Button } from "@/components/ui";
import { useDialog } from "@/hooks";
import { Plus } from "lucide-react";

export default function Venda() {

    const createDialogProps = useDialog();

    return (
        <section className="overflow-y-scroll px-7 p-4 w-full">
            <div className="flex items-center gap-3">
                <h1 className="text-2xl font-medium">Vendas</h1>
                <Button onClick={createDialogProps.open} variant="default" size="icon-lg">
                    <Plus />
                </Button>
            </div>
            <VendaListView />
            {createDialogProps.isOpen && <VendaCreateDialog {...createDialogProps}/>}
        </section>
    )
}