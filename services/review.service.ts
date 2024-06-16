import { ReviewRequest } from "@/lib/types/interfaces/Review";
import AppService from "./app.service";
import { REVIEW_ENDPOINTS } from "@/lib/constants/EndPoints";

class ReviewService extends AppService {
    constructor() {
        super();
    }

    getReview = (params: { assetId: number }) => {
        return this.get(REVIEW_ENDPOINTS.GET_REVIEWS, undefined, params);
    }

    addReview = (req: ReviewRequest) => {
        return this.post(REVIEW_ENDPOINTS.ADD_REVIEWS, req);
    }
}

export const reviewService = new ReviewService();