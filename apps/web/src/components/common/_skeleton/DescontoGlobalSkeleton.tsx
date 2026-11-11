import { Skeleton, TableCell, TableRow } from "@/components/ui";

export function DescontoGlobalSkeleton() {
    return (
        <TableRow>
            <TableCell><Skeleton className="h-5" /></TableCell>
            <TableCell><Skeleton className="h-5" /></TableCell>
        </TableRow>
    )
}