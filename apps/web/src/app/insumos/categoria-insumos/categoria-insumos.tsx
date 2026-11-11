import { CategoriaInsumoListView } from "@/components/common/insumos";
import { CategoriaInsumoCreateDialog } from "@/components/common/insumos/categorias/CategoriaInsumoCreateDialog";
import { Button } from "@/components/ui";
import { useDialog } from "@/hooks";
import { Plus } from "lucide-react";

/**
 * Tela para criação e exibição de categoria dos insumos do sistema.
 */
export default function CategoriaInsumos() {
    
    // Estado do dialog de criar categoria
    const dialogCreate = useDialog();

    return (
        <section className="w-full px-14 p-10">
            <div className="flex items-center gap-2 mb-5">
                <h1 className="text-2xl font-medium">Categoria de insumos</h1>
                <Button onClick={dialogCreate.open} size="icon-sm">
                    <Plus />
                </Button>
            </div>
            {dialogCreate.isOpen && <CategoriaInsumoCreateDialog  {...dialogCreate}/>}
            <CategoriaInsumoListView />
        </section>
    )
}