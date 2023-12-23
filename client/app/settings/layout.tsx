import SettingsRoutes from "./_components/settings-routes";
import SettingsTitle from "./_components/settings-title";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="container py-5 flex flex-col gap-y-5">
            <SettingsTitle />
            <div className="grid grid-cols-10 gap-x-5">
                <div className="col-span-10 md:col-span-2">
                    <SettingsRoutes />
                </div>
                <main className="cols-span-10 md:col-span-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
