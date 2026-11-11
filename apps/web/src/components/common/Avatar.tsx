import {AvatarFallback, AvatarImage, Avatar as SdAtavar, type AvatarProps as SdAvatarProps} from "@/components/ui/avatar"
import { UserRound } from "lucide-react"

type AvatarProps = SdAvatarProps & {
    src?: string
}

export function Avatar({...props}: AvatarProps) {
    return (
        <SdAtavar {...props}>
            <AvatarImage src={props.src} />
            <AvatarFallback>
                <UserRound />
            </AvatarFallback>
        </SdAtavar>
    )
}