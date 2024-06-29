import { ISearchParams } from "@/lib/interfaces/Search";
import AppService from "./app.service";
import { ASSET_ENDPOINTS } from "@/lib/constants/EndPoints";

class AssetService extends AppService {
    constructor() {
        super();
    }

    searchAssets = (params: ISearchParams) => {
        return this.get(ASSET_ENDPOINTS.GET_ASSET_LIST, undefined, params);
    }

    searchAssetsByPolygon = (polygon: string) => {
        return this.post(ASSET_ENDPOINTS.GET_ASSET_BY_POLYGON, {
            polygon: polygon
        });
    }

    getAssetBySlugName = (slugName: string) => {
        return this.get(ASSET_ENDPOINTS.GET_ASSET_BY_SLUG(slugName));
    }

    createAsset = (form: FormData) => {
        return this.post(ASSET_ENDPOINTS.CREATE, form);
    }
}

export const assetService = new AssetService();