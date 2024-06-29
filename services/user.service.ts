import { TENANT_ENDPOINTS, USER_ENDPOINTS } from "@/lib/constants/EndPoints";
import AppService from "./app.service";
import { ILoginSocial } from "@/lib/interfaces";

class UserService extends AppService {
    constructor() {
        super();
    }

    getUserInfo = (username: string) => {
        return this.get(USER_ENDPOINTS.GET_INFO(username));
    }

    getUserInfoById = (id: number) => {
        return this.get(USER_ENDPOINTS.GET_INFO_BY_ID(id));
    }

    upgradeLandlord = (form: FormData) => {
        return this.patch(USER_ENDPOINTS.UPGRADE_LANDLORD, form);
    }

    createVoteReq = (form: FormData) => {
        return this.post(TENANT_ENDPOINTS.CREATE, form)
    }

    verify = (req: ILoginSocial) => {
        return this.post(USER_ENDPOINTS.VERIFY, req);
    }
}

export const userService = new UserService();