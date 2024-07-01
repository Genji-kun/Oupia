import { api } from "@/lib/api";
import { TENANT_ENDPOINTS, VOTE_ENDPOINTS } from "@/lib/constants/EndPoints";
import { IVoteRequest } from "@/lib/interfaces/Vote";

class VoteService {

    getListLandlordInfoes = (page: number) => {
        return api.get(VOTE_ENDPOINTS.GET_LIST_LANDLORD, {
            params: {
                size: 8,
                page: page
            }
        });
    }

    getListTenantRequests = (page: number) => {
        return api.get(TENANT_ENDPOINTS.GET_LIST, {
            params: {
                size: 8,
                page: page
            }
        });
    }

    getOneLandlordInfo = (id: string) => {
        return api.get(VOTE_ENDPOINTS.GET_ONE_LANDLORD(id));
    }

    getOneTenantRequestInfo = (id: string) => {
        return api.get(VOTE_ENDPOINTS.GET_ONE_TENANT_REQUEST(id));
    }


    createVote = (req: IVoteRequest) => {
        return api.post(VOTE_ENDPOINTS.CREATE_VOTE, req);
    }

}

export const voteService = new VoteService();