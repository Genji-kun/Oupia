import { POST_ENDPOINTS } from "@/lib/constants/EndPoints";
import { api } from "@/lib/api";

class PostService {

    upload = (form: FormData) => {
        return api.post(POST_ENDPOINTS.CREATE, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

}

export const postService = new PostService();