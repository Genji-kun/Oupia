import Header from "@/components/shared/Header";
import Footer from "@/components/ui/footer";

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className="mt-[60px] lg:mt-[80px] min-h-[calc(100vh-80px)]">
                {children}
            </main>
            <Footer />
        </>
    )
}

export default GeneralLayout;

