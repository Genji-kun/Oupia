import { IUserLogin, IUserRegister } from "@/lib/types/interfaces";
import BaseService from "./BaseService";
import { AUTH_ENDPOINTS } from "@/lib/constants/EndPoints";

class AuthService extends BaseService {
    constructor() {
        super();
    }
    register = (form: FormData) => {
        return this.post(AUTH_ENDPOINTS.SIGN_UP, form);
    };

    login = (userLogin: IUserLogin) => {
        return this.post(AUTH_ENDPOINTS.SIGN_IN, userLogin);
    };

    currentUser = () => {
        return this.get(AUTH_ENDPOINTS.CURRENT_USER);
    }

    getToken = () => {
        return this.get(AUTH_ENDPOINTS.GET_AUTH_TOKEN);
    }
}


export const authService = new AuthService();