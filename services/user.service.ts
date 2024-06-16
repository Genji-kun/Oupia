import { USER_ENDPOINTS } from "@/lib/constants/EndPoints";
import AppService from "./app.service";

class UserService extends AppService {
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