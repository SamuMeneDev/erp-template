import { Skeleton, TableCell, TableRow } from "@/components/ui";

export function AdminUsuarioListSkeleton() {
    return (
        <TableRow>
            <TableCell>
                <Skeleton className="h-5" />
            </TableCell>
            <TableCell colSpan={1}>
                <Skeleton className="h-5" />
            </TableCell>
        </TableRow>
    )
}