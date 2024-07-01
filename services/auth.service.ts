import { ILoginSocial, IUserLogin } from "@/lib/interfaces";
import { AUTH_ENDPOINTS } from "@/lib/constants/EndPoints";
import { api } from "@/lib/api";

class AuthService  {

    register = (form: FormData) => {
        return api.post(AUTH_ENDPOINTS.SIGN_UP, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    login = (userLogin: IUserLogin) => {
        return api.post(AUTH_ENDPOINTS.SIGN_IN, userLogin);
    };

    loginSocial = (req: ILoginSocial) => {
        return api.post(AUTH_ENDPOINTS.SOCIAL_LOGIN, req);
    }

    currentUser = () => {
        return api.get(AUTH_ENDPOINTS.CURRENT_USER);
    }

    getToken = () => {
        return api.get(AUTH_ENDPOINTS.GET_AUTH_TOKEN);
    }
}


export const authService = new AuthService();