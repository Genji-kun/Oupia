import { Metadata } from "next";
import MobileSidebar from "./_components/mobile-sidebar";
import SettingsRoutes from "./_components/settings-routes";
import SettingsTitle from "./_components/settings-title";

export const metadata: Metadata = {
    title: 'Oupia | Cài đặt và tùy chỉnh',
    description: '',
}

export default function SettingsLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="container flex flex-col gap-y-5 px-4 xl:px-0">
            <SettingsTitle />
            <div className="grid grid-cols-10 gap-4">
                <div className="hidden md:block col-span-10 lg:col-span-2">
                    <SettingsRoutes />
                </div>
                <main className="col-span-10 lg:col-span-6">
                    {children}
                </main>
            </div>
            <div className="md:hidden">
                <MobileSidebar />
            </div>
        </div>
    )
}
