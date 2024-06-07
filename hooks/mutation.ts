"use client"

import { IUserLogin } from "@/lib/types/interfaces";
import { authService } from "@/services/AuthService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/currentUserSlice";
import Cookies from "js-cookie";
import { postService } from "@/services/PostService";
import { toast } from "sonner";
import { userService } from "@/services/UserService";

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