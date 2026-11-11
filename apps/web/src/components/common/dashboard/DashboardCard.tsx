import type { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui";

type DashboardCardProps = {
    titulo: string,
    descricao?: string,
    content: string | number,
    actions?: ReactNode
}

/** Componente que mostra dados menores em um card na dashboard
 * 
 */
export function DashboardCard({...props}: DashboardCardProps) {
    return (
        <Card className="w-full min-h-[25%]">
            <CardHeader>
                <CardTitle>{props.titulo}</CardTitle>
                {props.descricao && (
                    <CardDescription>{props.descricao}</CardDescription>
                )}
            </CardHeader>
            <CardContent className="flex justify-center">
                <h3 className="font-bold text-3xl">{props.content}</h3>
            </CardContent>
            {props.actions && (
                <CardFooter>
                    {props.actions}
                </CardFooter>
            )}
        </Card>
    )
}