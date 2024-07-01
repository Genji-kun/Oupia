import { api } from "@/lib/api";
import { TENANT_ENDPOINTS, USER_ENDPOINTS } from "@/lib/constants/EndPoints";
import { ILoginSocial } from "@/lib/interfaces";

class UserService {

    getUserInfo = (username: string) => {
        return api.get(USER_ENDPOINTS.GET_INFO(username));
    }

    getUserInfoById = (id: number) => {
        return api.get(USER_ENDPOINTS.GET_INFO_BY_ID(id));
    }

    upgradeLandlord = (form: FormData) => {
        return api.patch(USER_ENDPOINTS.UPGRADE_LANDLORD, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    createVoteReq = (form: FormData) => {
        return api.post(TENANT_ENDPOINTS.CREATE, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }

    verify = (req: ILoginSocial) => {
        return api.post(USER_ENDPOINTS.VERIFY, req);
    }
}

export const userService = new UserService();