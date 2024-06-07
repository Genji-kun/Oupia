import { USER_ENDPOINTS } from "@/lib/constants/EndPoints";
import BaseService from "./BaseService";

class UserService extends BaseService {
    constructor() {
        super();
    }

    getUserInfo = (username: string) => {
        return this.get(USER_ENDPOINTS.GET_INFO(username));
    }

    upgradeLandlord = () => {
        return this.patch(USER_ENDPOINTS.UPGRADE_LANDLORD);
    }
}

export const userService = new UserService();