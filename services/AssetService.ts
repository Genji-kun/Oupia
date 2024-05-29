import { ISearchParams } from "@/lib/types/interfaces/Search";
import BaseService from "./BaseService";
import { ASSET_ENDPOINTS } from "@/lib/constants/EndPoints";

class AssetService extends BaseService {
    constructor() {
        super();
    }

    searchAssets = (params: ISearchParams) => {
        return this.get(ASSET_ENDPOINTS.GET_ASSET_LIST, params);
    }
}

export const assetService = new AssetService();