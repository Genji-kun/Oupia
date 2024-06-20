import { VOTE_ENDPOINTS } from "@/lib/constants/EndPoints";
import AppService from "./app.service";

class VoteService extends AppService {
    constructor() {
        super();
    }

    getLandlordInfo = (page: number) => {
        return this.get(VOTE_ENDPOINTS.GET_LANDLORD, undefined, {
            size: 5,
            page: page
        });
    }
}

export const voteService = new VoteService();