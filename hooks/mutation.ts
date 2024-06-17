"use client"

import { IUserLogin } from "@/lib/types/interfaces";
import { authService } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/currentUserSlice";
import Cookies from "js-cookie";
import { postService } from "@/services/post.service";
import { toast } from "sonner";
import { userService } from "@/services/user.service";
import { ReviewRequest } from "@/lib/types/interfaces/Review";
import { reviewService } from "@/services/review.service";
import { QUERY_KEY } from "@/lib/constants/QueryKeys";
import { publicApi } from "@/configs/axiosInstance";
import { assetsEndpoints } from "@/configs/axiosEndpoints";
import { certificationService } from "@/services/certification.service";

// ----------- AUTH -------------

export const useRegister = () => {

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (form: FormData) => {
            const { data: res } = await authService.register(form);
            return res;
        }
    })

    return {
        mutateRegister: mutateAsync,
        isPendingRegister: isPending,
    };

}

export const useLogin = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (form: IUserLogin) => {
            const { data } = await authService.login(form);
            Cookies.set("accessToken", data.accessToken);
            const { data: currentUserInfo } = await authService.currentUser();
            Cookies.set("user", JSON.stringify(currentUserInfo));
            dispatch(login(currentUserInfo));
            router.push("/");
        },
    })

    return {
        mutateLogin: mutateAsync,
        isPendingLogin: isPending
    }
}

// ----------- POST --------------

export const useUploadPost = () => {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (form: FormData) => {
            await postService.upload(form);
        },
        onSuccess: () => {
            toast.success("Thêm bài viết thành công");
        },
        onError: () => {
            toast.error("Đã có lỗi xảy ra, vui lòng thử lại.");
        }
    })

    return {
        mutateUploadPost: mutateAsync,
        isPendingUploadPost: isPending
    }
}

// ----------- USER --------------

export const useLandlordUpgrade = () => {
    const dispatch = useDispatch();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async () => {
            await userService.upgradeLandlord();
        },
        onSuccess: async () => {
            try {
                const { data: currentUserInfo } = await authService.currentUser();
                Cookies.set("user", JSON.stringify(currentUserInfo));
                dispatch(login(currentUserInfo));
                toast.success("Cập nhật thông tin thành công");
            } catch (error) {
                toast.error("Đã có lỗi xảy ra, vui lòng thử lại.");
            }
        },
        onError: () => {
            toast.error("Đã có lỗi xảy ra, vui lòng thử lại.");
        }
    })

    return {
        mutateUploadPost: mutateAsync,
        isPendingUploadPost: isPending
    }
}

export const useAssetMutate = () => {
    const { assetSlug } = useParams<{ assetSlug: string }>();

    const { mutateAsync: assetMutate, isSuccess: assetSuccess } = useMutation({
        mutationFn: async () => {
            try {
                const res = await publicApi.get(assetsEndpoints.getAssetBySlugName(assetSlug));
                if (res.status === 200) {
                    return res.data;
                }
            } catch (error) {
                console.error(error);
            }
        },
    })

    return {
        assetMutate,
        assetSuccess
    }

}


export const useAddReview = () => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (req: ReviewRequest) => {
            await reviewService.addReview(req);
        },
        onSuccess: () => {
            toast.success("Đăng đánh giá thành công");

            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_REVIEWS] })
        },
        onError: (error) => {
            toast.error("Đã có lỗi xảy ra vui lòng thử lại")
            console.error(error);
        }
    })

    return {
        mutateAddReview: mutateAsync,
        isPendingAddReview: isPending
    }
}

// ----------- CERTIFICATIONS ------------

export const useAcceptCertification = () => {
    const router = useRouter();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (token: string) => {
            await certificationService.acceptCertification(token);
        },
        onSuccess: () => {
            toast.success("Xác nhận chứng chỉ thành công, bây giờ bạn có thể đánh giá nhà trọ đã nhận qua email");
            router.push("/");
        }
    });

    return {
        mutateAsync,
        isPending
    }
}