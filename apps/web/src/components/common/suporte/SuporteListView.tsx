import { useChamadoFindAll } from "@erp-template/services"
import { ChamadoItem } from "./chamado/ChamadoItem";
import { Accordion } from "@/components/ui";
import { Repetidor } from "../_skeleton";
import { ChamadoItemSkeleton } from "../_skeleton/ChamadoItemSkeleton";

export function SuporteListView() {
    const { data, isPending } = useChamadoFindAll();
    
    return (
        <div className="flex flex-col gap-5">
            <Accordion>
                {data?.data && data.data.map(c=>(
                    <ChamadoItem key={c.id} chamado={c} />
                ))}
                {data?.data && data.data.length < 1 && (
                    <span className="text-stone-500">Nenhum chamado encontrado.</span>
                )}
                {isPending && (
                    <div className="flex w-full flex-col gap-3">
                        <Repetidor elemento={<ChamadoItemSkeleton />} vezes={5} />
                    </div>
                )}
            </Accordion>
        </div>
    )
}