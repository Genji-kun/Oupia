import { FindAssetProvider } from "@/contexts/find-asset-context"
import { Metadata } from "next"
import FilterBar from "./_components/filter-bar"
import { Suspense } from "react"
import Loading from "./loading"
import Hydration from "@/components/shared/Hydration"

export const metadata: Metadata = {
    title: 'Tìm thuê',
}

export default function FindAssetLayout(
    { children }: { children: React.ReactNode }
) {
    return (
        <Suspense fallback={<Loading />} >
            <Hydration>
                <FindAssetProvider>
                    <div className="xl:h-screen bg-background hidden xl:block fixed left-0 z-100">
                        <FilterBar />
                    </div>
                    <div className="flex h-[calc(100vh-80px)] w-full">
                        <div className="xl:min-w-96 hidden xl:block"></div>
                        <div className="flex-auto">
                            <div className=" w-full h-full">
                                <div className="flex flex-col gap-4 w-full h-full">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </FindAssetProvider>
            </Hydration>
        </Suspense>
    )
}
