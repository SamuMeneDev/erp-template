import { Navbar } from "@/components/common/Navbar";
import { Outlet } from "react-router";

export default function RootLayout() {
    return (
        <main>
            <Navbar />
            <Outlet />
        </main>
    )
}