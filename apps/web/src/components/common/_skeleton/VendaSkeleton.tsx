import { Skeleton, TableCell, TableRow } from "@/components/ui";

export function VendaSkeleton() {
    return (
        <TableRow>
            <TableCell><Skeleton className="h-5" /></TableCell>
            <TableCell className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-5" />
            </TableCell>
            <TableCell><Skeleton className="h-5" /></TableCell>
            <TableCell><Skeleton className="h-5" /></TableCell>
            <TableCell><Skeleton className="h-5" /></TableCell>
        </TableRow>
    )
}