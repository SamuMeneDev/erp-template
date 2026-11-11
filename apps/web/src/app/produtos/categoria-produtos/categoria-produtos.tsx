import { CategoriaProdutoCreateDialog, CategoriaProdutoListView } from "@/components/common/produtos";
import { Button } from "@/components/ui";
import { useDialog } from "@/hooks";
import { Plus } from "lucide-react";

export default function CategoriaProdutos() {
    /**
     * Estados do dialog de create.
     */
    const { isOpen, open, close } = useDialog();
    
    return (
        <section className="p-5">
            <div className="flex gap-2 mb-2">
                <h1 className="text-xl font-medium">Categoria de produtos</h1>
                <Button onClick={open} size="icon-sm">
                    <Plus />
                </Button>
            </div>
            <CategoriaProdutoCreateDialog close={close} isOpen={isOpen} />
            <CategoriaProdutoListView />
        </section>
    )
}