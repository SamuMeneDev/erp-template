import { Skeleton } from "@/components/ui";

export function CategoriaInsumoSkeleton() {
    return (
        <div className="space-y-1">
            <Skeleton className="h-6 w-65"/>
            <Skeleton className="h-6 w-50"/>
        </div>
    )
}