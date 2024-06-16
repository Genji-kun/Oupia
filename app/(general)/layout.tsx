import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/shared/Header"), {
    ssr: false
});

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className="mt-[60px] lg:mt-[80px] min-h-[calc(100vh-80px)]">
                {children}
            </main>
        </>
    )
}

export default GeneralLayout;

