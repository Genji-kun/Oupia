import { ISearchParams } from "@/lib/interfaces/Search"
import { ASSET_ENDPOINTS } from "@/lib/constants/EndPoints";
import { api } from "@/lib/api";

class AssetService {

    searchAssets = (params: ISearchParams) => {
        return api.get(ASSET_ENDPOINTS.GET_ASSET_LIST, {
            params: params
        });
    }

    searchAssetsByPolygon = (polygon: string) => {
        return api.post(ASSET_ENDPOINTS.GET_ASSET_BY_POLYGON, {
            polygon: polygon
        });
    }

    getAssetBySlugName = (slugName: string) => {
        return api.get(ASSET_ENDPOINTS.GET_ASSET_BY_SLUG(slugName));
    }

}

export const assetService = new AssetService();