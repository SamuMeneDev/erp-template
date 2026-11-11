import { ProdutoCreateDialog, ProdutoListView } from "@/components/common/produtos";

import { Button } from "@/components/ui";
import { useDialog } from "@/hooks";
import { Plus } from "lucide-react";

export default function Produtos() {
    /**
     * Estado do Dialog
     */
    const dialogCreate = useDialog();

    return (
        <section className="overflow-y-scroll overflow-x-hidden px-7 p-4 w-full">
            <div className="flex items-center gap-3">
                <h1 className="text-2xl font-medium">Produtos</h1>
                <Button onClick={dialogCreate.open} variant="default" size="icon-lg">
                    <Plus />
                </Button>
            </div>
            {dialogCreate.isOpen && <ProdutoCreateDialog {...dialogCreate} />}
            <ProdutoListView />
        </section>
    )
}