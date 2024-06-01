"use client"

import { IUserLogin } from "@/lib/types/interfaces";
import { authService } from "@/services/AuthService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/currentUserSlice";
import Cookies from "js-cookie";

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
            console.log(Cookies.get("accessToken"));
            const { data: currentUserInfo } = await authService.currentUser();
            Cookies.set("user", currentUserInfo);
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

        }
    })
}
