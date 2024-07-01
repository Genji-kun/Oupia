import { ReviewRequest } from "@/lib/interfaces/Review";
import { REVIEW_ENDPOINTS } from "@/lib/constants/EndPoints";
import { api } from "@/lib/api";

class ReviewService {

    getReview = (params: { assetId: number }) => {
        return api.get(REVIEW_ENDPOINTS.GET_REVIEWS, {
            params: params
        });
    }

    addReview = (req: ReviewRequest) => {
        return api.post(REVIEW_ENDPOINTS.ADD_REVIEWS, req);
    }
}

export const reviewService = new ReviewService();