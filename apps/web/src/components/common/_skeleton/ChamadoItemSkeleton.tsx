import { Skeleton } from "@/components/ui";

export function ChamadoItemSkeleton() {
    return (
        <div className="space-y-1">
            <Skeleton className="h-6 w-full"/>
            <Skeleton className="h-6 w-[75%]"/>
        </div>
    )
}