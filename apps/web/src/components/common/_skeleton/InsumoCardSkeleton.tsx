import { Skeleton } from "@/components/ui";

export function InsumoCardSkeleton() {
    return (
        <div className="space-y-3 w-xs">
            <Skeleton className="h-55 rounded-2xl" />
            <Skeleton className="h-5 " />
            <div className="flex gap-2">
                <Skeleton className="h-5 w-[75%]" />
                <Skeleton className="h-5 w-[25%]" />
            </div>
            <Skeleton className="h-5 w-[85%]" />
            <Skeleton className="h-5 " />
        </div>
    )
}