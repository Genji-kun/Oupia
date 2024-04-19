import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar/navbar";

export default function GeneralLayout(
    { children }: { children: React.ReactNode }
) {

    return (
        <>
            <Navbar />
            <main className="mt-[60px] lg:mt-[80px] min-h-[calc(100vh-80px)]">
                {children}
            </main>
            <Footer />
        </>
    )
}
