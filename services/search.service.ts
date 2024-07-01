import { api } from "@/lib/api";
import { SEARCH_ENDPOINTS } from "@/lib/constants/EndPoints";

class SearchService {

    searchAmenities = (keyword: string) => {
        return api.get(SEARCH_ENDPOINTS.AMENITY, {
            params: {
                keyword: keyword
            }
        });
    }
}

export const searchService = new SearchService();