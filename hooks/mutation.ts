"use client"

import { ILoginSocial, IUserLogin } from "@/lib/interfaces";
import { authService } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/currentUserSlice";
import Cookies from "js-cookie";
import { postService } from "@/services/post.service";
import { toast } from "sonner";
import { userService } from "@/services/user.service";
import { ReviewRequest } from "@/lib/interfaces/Review";
import { reviewService } from "@/services/review.service";
import { QUERY_KEY } from "@/lib/constants/QueryKeys";
import { assetsEndpoints } from "@/configs/axiosEndpoints";
import { certificationService } from "@/services/certification.service";
import { IVoteRequest } from "@/lib/interfaces/Vote";
import { voteService } from "@/services/vote.service";
import { VoteType } from "@/lib/enums";
import { api } from "@/lib/api";

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
            const { data: currentUser } = await authService.currentUser();
            const { data: info } = await userService.getUserInfo(currentUser.username);

            const currentUserInfo = {
                id: currentUser.id,
                fullName: currentUser.fullName,
                username: currentUser.username,
                createdAt: info.createdAt,
                role: currentUser.role,
                avatar: currentUser.avatar,
                provider: info.oauthProviders,
                reputationScore: info.reputationScore,
                isConfirm: info.isConfirm,
            }

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

export const useLoginSocial = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (req: ILoginSocial) => {
            const { data } = await authService.loginSocial(req);
            Cookies.set("accessToken", data.accessToken);
            const { data: currentUser } = await authService.currentUser();
            const { data: info } = await userService.getUserInfo(currentUser.username);

            const currentUserInfo = {
                id: currentUser.id,
                fullName: currentUser.fullName,
                username: currentUser.username,
                createdAt: info.createdAt,
                role: currentUser.role,
                avatar: currentUser.avatar,
                provider: info.oauthProviders,
                reputationScore: info.reputationScore,
                isConfirm: info.isConfirm,
            }
            Cookies.set("user", JSON.stringify(currentUserInfo));
            dispatch(login(currentUserInfo));
            router.push("/");
        },
    })

    return {
        mutateLoginSocial: mutateAsync,
        isPendingLoginSocial: isPending
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
        mutationFn: async (form: FormData) => {
            await userService.upgradeLandlord(form);
        },
        onSuccess: async () => {
            try {
                const { data: currentUser } = await authService.currentUser();
                const { data: info } = await userService.getUserInfo(currentUser.username);

                const currentUserInfo = {
                    id: currentUser.id,
                    fullName: currentUser.fullName,
                    username: currentUser.username,
                    createdAt: info.createdAt,
                    role: currentUser.role,
                    avatar: currentUser.avatar,
                    provider: info.oauthProviders,
                    reputationScore: info.reputationScore,
                    isConfirm: info.isConfirm,
                }
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
        mutateLandlordUpgrade: mutateAsync,
        isPendingLandlordUpgrade: isPending
    }
}

export const useAssetMutate = () => {
    const { assetSlug } = useParams<{ assetSlug: string }>();

    const { mutateAsync: assetMutate, isSuccess: assetSuccess } = useMutation({
        mutationFn: async () => {
            try {
                const res = await api.get(assetsEndpoints.getAssetBySlugName(assetSlug));
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


// ------------ VOTE ----------------------

export const useCreateVote = () => {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (req: IVoteRequest) => {
            await voteService.createVote(req);
            if (req.type === VoteType.LANDLORD) {
                const { data } = await voteService.getOneLandlordInfo(req.targetId.toString());
                return data;
            } else {
                const { data } = await voteService.getOneTenantRequestInfo(req.targetId.toString());
                return data;
            }

        },
        onSuccess: () => {
            toast.success("Cảm ơn bạn đã đánh giá thông tin. Hãy tiếp tục phát huy nhé !!");
        }
    })

    return {
        mutateCreateVote: mutateAsync,
        isPendingCreateVote: isPending
    }
}

export const useCreateVoteReq = () => {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (form: FormData) => {
            await userService.createVoteReq(form);
        },
        onSuccess: () => {
            toast.success("Gửi yêu cầu thành công, thông tin của bạn sẽ được hiển thị trên trang xác thực đánh giá.")
        }
    })
    return {
        mutateCreateVoteReq: mutateAsync,
        isPendingCreateVoteReq: isPending
    }
}

// ------------ VERIFY --------------------

export const useVerifySocial = () => {
    const dispatch = useDispatch();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (req: ILoginSocial) => {
            const { data: info } = await userService.verify(req);

            const currentUserInfo = {
                id: info.id,
                fullName: info.fullName,
                username: info.username,
                createdAt: info.createdAt,
                role: info.role,
                avatar: info.avatar,
                provider: info.oauthProviders,
                reputationScore: info.reputationScore,
                isConfirm: info.isConfirm,
            }
            Cookies.set("user", JSON.stringify(currentUserInfo));
            dispatch(login(currentUserInfo));
        },
        onSuccess: () => {
            toast.success("Xác thực thông tin thành công.")
        }
    })

    return {
        mutateVerify: mutateAsync,
        isPendingVerify: isPending
    }
}