import { ReviewRequest } from "@/lib/types/interfaces/Review";
import BaseService from "./BaseService";
import { REVIEW_ENDPOINTS } from "@/lib/constants/EndPoints";

class ReviewService extends BaseService {
    constructor() {
        super();
    }

    getReview = (params: { assetId: number }) => {
        return this.get(REVIEW_ENDPOINTS.GET_REVIEWS);
    }

    addReview = (req: ReviewRequest) => {
        return this.post(REVIEW_ENDPOINTS.ADD_REVIEWS, req);
    }
}

export const reviewService = new ReviewService();