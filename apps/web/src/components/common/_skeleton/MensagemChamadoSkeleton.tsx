import { Skeleton } from "@/components/ui";

export function MensagemChamadoSkeleton() {
    return (
        <>
            <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-15" />
            </div>
            <div className="flex items-end flex-col gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-27" />
            </div>
            <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-27" />
            </div>

        </>
    )
}