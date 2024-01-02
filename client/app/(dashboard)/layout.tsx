import Navbar from "@/components/ui/navbar/navbar";

export default function DashboardLayout(
    { children }: { children: React.ReactNode }
) {

    return (
        <>
            <Navbar />
            <main className="mt-[80px]">
                {children}
            </main>
        </>
    )
}
