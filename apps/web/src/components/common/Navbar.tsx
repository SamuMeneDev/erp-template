import { Menu, Palette } from "lucide-react";
import { Button, useSidebar } from "../ui";
import { useTheme } from "@/contexts";
import { useAuth } from "@erp-template/contexts";

export function Navbar() {

    const { toggleTheme } = useTheme();
    const { isAuth } = useAuth();

    return (
        <div className="flex p-3 bg-primary items-center justify-between w-full">
            {isAuth && <NavbarMobileToggle />}
            <div className="flex">
                <h2 className="text-primary-foreground text-xl">ERP Template</h2>
                <span className="text-xs text-primary-foreground font-semibold">v1.3.0</span>
            </div>
            <Button className="text-white" onClick={toggleTheme} size="icon-lg" variant="ghost">
                <Palette />
            </Button>
        </div>
    )
}

function NavbarMobileToggle() {
    const { isMobile, toggleSidebar } = useSidebar();
    
    if(isMobile) {
        return (
            <Button variant="ghost" size="icon-lg" className="text-white" onClick={toggleSidebar}>
                <Menu />
            </Button>
        )
    }
}
