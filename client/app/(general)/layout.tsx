import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar/navbar";
import dynamic from "next/dynamic";

const GeneralLayout = (
    { children }: { children: React.ReactNode }
) => {

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

export default dynamic(() => Promise.resolve(GeneralLayout), { ssr: false })

