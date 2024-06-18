import { SEARCH_ENDPOINTS } from "@/lib/constants/EndPoints";
import AppService from "./app.service";

class SearchService extends AppService {
    constructor() {
        super();
    }

    searchAmenities = (keyword: string) => {
        return this.get(SEARCH_ENDPOINTS.AMENITY, undefined, {
            keyword: keyword
        });
    }
}

export const searchService = new SearchService();