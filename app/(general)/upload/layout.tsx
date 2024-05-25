import { UploadProvider } from "@/contexts/upload-context";
import UtilitiesBar from "./_components/utilities-bar";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: 'Oupia | Đăng bài mới',
    description: '',
}

function UploadLayout(
    { children }: { children: React.ReactNode }
) {

    return (
        <UploadProvider>
            <div className="container grid grid-cols-10 gap-8 xl:py-8 h-[calc(100vh-60px)] xl:h-[calc(100vh-80px)]">
                <main className="col-span-10 lg:col-span-7 overflow-y-auto w-full rounded-xl bg-background dark:bg-oupia-base shadow-light-theme shadow-dark-theme">
                    {children}
                </main>
                <div className="col-span-3 hidden lg:flex flex-col h-full w-full gap-4">
                    <UtilitiesBar />
                </div>
            </div>
        </UploadProvider>
    )
}

export default dynamic(() => Promise.resolve(UploadLayout), { ssr: false })

