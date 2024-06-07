import { POST_ENDPOINTS } from "@/lib/constants/EndPoints";
import BaseService from "./BaseService";

class PostService extends BaseService {
    constructor() {
        super();
    }

    upload = (form: FormData) => {
        return this.post(POST_ENDPOINTS.CREATE, form);
    }

}

export const postService = new PostService();