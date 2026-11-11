import { FieldLabel, NativeSelect, NativeSelectOption } from "@/components/ui";
import { useTheme } from "@/contexts";
import type { HTMLAttributes } from "react";

/**
 * Painel com as preferências do usuário como, tema etc.
 */

type UserPreferencesProps = HTMLAttributes<HTMLDivElement> & {

}

export function UserPreferences({...props}: UserPreferencesProps) {
    const { theme, setTheme } = useTheme();
    return (
        <div {...props}>
            <h2 className="text-stone-500">Preferências do usuário</h2>
            <div className="flex gap-3">
                <FieldLabel>Tema</FieldLabel>
                <NativeSelect className="w-full" onChange={(e)=>setTheme(e.target.value)} value={theme}>
                    <NativeSelectOption value="system">Padrão do sistema</NativeSelectOption>
                    <NativeSelectOption value="light">Claro</NativeSelectOption>
                    <NativeSelectOption value="dark">Escuro</NativeSelectOption>
                </NativeSelect>
            </div>
        </div>
    )
}
