import { QUERY_KEY } from "@/lib/constants/QueryKeys"
import { assetService } from "@/services/AssetService";
import { authService } from "@/services/AuthService"
import { userService } from "@/services/UserService";
import { useQuery } from "@tanstack/react-query"
import { useState } from "react";


export const useSearchAssets = (pageSize: number, currentPage: number, kw: string, price: [number, number], maxPeople: number) => {
    const [totalPages, setTotalPages] = useState(1);

    const { data, isFetching } = useQuery({
        queryKey: ["searchAsset", { pageSize, currentPage, kw, price, maxPeople }],
        queryFn: async ({ queryKey }: any) => {
            const [_key, { pageSize, currentPage, kw, price, maxPeople }] = queryKey;
            const res = await assetService.searchAssets({
                keyword: kw,
                size: pageSize,
                page: currentPage,
                minPrice: price[0],
                maxPrice: price[1],
                maxPeople: maxPeople
            })
            if (res.data.totalPages > 0)
                setTotalPages(res.data.totalPages);
            else
                setTotalPages(1);
            return res.data.content;
        },
        refetchOnWindowFocus: false,

    })

    return {
        assetResults: data,
        isFetchingAssetResults: isFetching,
        totalPages
    };
}

export const useUserInfo = (username: string) => {

    const { data, isFetching } = useQuery({
        queryKey: [QUERY_KEY.GET_USER_INFO, username],
        queryFn: async ({ queryKey }) => {
            const [_key, username] = queryKey;
            const res = await userService.getUserInfo(username);
            return res.data;
        },
        refetchOnWindowFocus: false,
    })

    return {
        userInfoData: data,
        isFetchingUserInfo: isFetching
    }
}

export const useAuthToken = () => {
    const { data, isFetching } = useQuery({
        queryKey: [QUERY_KEY.AUTH_TOKEN],
        queryFn: async () => {
            const res = await authService.getToken();
            return res.data;
        },
        refetchOnWindowFocus: false,
    })

    return {
        dataAuthToken: data,
        isFetchingAuthToken: isFetching
    };
}