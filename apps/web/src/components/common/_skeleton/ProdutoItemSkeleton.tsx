import { Skeleton } from "@/components/ui";

export function ProdutoItemSkeleton() {
    return (
        <div className="space-y-1">
            <Skeleton  className="h-7 w-full"/>
            <Skeleton  className="h-7 w-[80%]"/>
        </div>
    )
}