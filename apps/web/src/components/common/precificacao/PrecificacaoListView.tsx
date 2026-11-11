import { usePrecificacaoFindAll } from "@erp-template/services"
import { PrecificacaoItem } from "./PrecificacaoItem";
import { PrecificacaoSkeleton, Repetidor } from "../_skeleton";

export function PrecificacaoListView() {
    const { data, isPending } = usePrecificacaoFindAll();
    return (
        <div className="flex flex-col gap-5">
            {data?.data && data.data.map(p=>(
                <PrecificacaoItem precificacao={p} key={p.id} />
            ))}

            {isPending &&
            <Repetidor elemento={<PrecificacaoSkeleton />} vezes={5} />}
        </div>
    )
}