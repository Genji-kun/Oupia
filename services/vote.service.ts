import { VOTE_ENDPOINTS } from "@/lib/constants/EndPoints";
import AppService from "./app.service";
import { IVoteRequest } from "@/lib/types/interfaces/Vote";

class VoteService extends AppService {
    constructor() {
        super();
    }

    getListLandlordInfoes = (page: number) => {
        return this.get(VOTE_ENDPOINTS.GET_LIST_LANDLORD, undefined, {
            size: 5,
            page: page
        });
    }

    getOneLandlordInfo = (id: string) => {
        return this.get(VOTE_ENDPOINTS.GET_ONE_LANDLORD(id));
    }

    createVote = (req: IVoteRequest) => {
        return this.post(VOTE_ENDPOINTS.CREATE_VOTE, req);
    }
}

export const voteService = new VoteService();