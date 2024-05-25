import { IUserLogin, IUserRegister } from "@/interfaces";
import BaseService from "./BaseService";
import { AUTH_ENDPOINTS } from "@/lib/constants/EndPoints";

class AuthService extends BaseService {
    constructor() {
        super();
    }
    register = (userRegister: IUserRegister) => {
        return this.post(AUTH_ENDPOINTS.SIGN_UP, userRegister);
    };

    login = (userLogin: IUserLogin) => {
        return this.post(AUTH_ENDPOINTS.SIGN_IN, userLogin);
    };

    currentUser = () => {
        return this.get(AUTH_ENDPOINTS.CURRENY_USER);
    }

    getToken = () => {
        return this.get(AUTH_ENDPOINTS.GET_AUTH_TOKEN);
    }
}


export const authService = new AuthService();