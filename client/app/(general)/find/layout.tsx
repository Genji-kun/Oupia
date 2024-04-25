import { FindAssetProvider } from "@/contexts/find-asset-context";
import FilterBar from "./_components/filter-bar";
import AssetList from "./_components/asset-list";
import AssetPagination from "./_components/asset-pagination";
import dynamic from "next/dynamic";

function FindAssetLayout(
    { children }: { children: React.ReactNode }
) {

    return (
        <FindAssetProvider>
            <div className="xl:h-screen bg-background hidden xl:block fixed left-0 z-100">
                <FilterBar />
            </div>
            <div className="flex min-h-[calc(100vh-80px)] w-full">
                <div className="xl:min-w-96 hidden xl:block"></div>
                <div className="flex-auto">
                    <div className=" w-full h-full p-4">
                        <div className="flex flex-col gap-4 w-full h-full">
                            <AssetList />
                            <AssetPagination />
                        </div>
                    </div>
                </div>
            </div>
        </FindAssetProvider>
    )
}

export default dynamic(() => Promise.resolve(FindAssetLayout), { ssr: false })
