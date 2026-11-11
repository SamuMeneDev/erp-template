import { Skeleton } from "@/components/ui";

export function PrecificacaoSkeleton() {
    return (
        <div className="w-full py-1 space-y-2">
            <Skeleton className="h-5" />
            <div className="flex gap-2">
                <Skeleton className="h-4 w-[20%]" />
                <Skeleton className="h-4 w-[80%]" />
            </div>
            <Skeleton className="h-7" />
        </div>
    )
}