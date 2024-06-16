import { POST_ENDPOINTS } from "@/lib/constants/EndPoints";
import AppService from "./app.service";

class PostService extends AppService {
    constructor() {
        super();
    }

    upload = (form: FormData) => {
        return this.post(POST_ENDPOINTS.CREATE, form);
    }

}

export const postService = new PostService();