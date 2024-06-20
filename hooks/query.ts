import { QUERY_KEY } from "@/lib/constants/QueryKeys"
import { assetService } from "@/services/asset.service";
import { authService } from "@/services/auth.service"
import { searchService } from "@/services/search.service";
import { userService } from "@/services/user.service";
import { voteService } from "@/services/vote.service";
import { useQuery } from "@tanstack/react-query"
import { useState } from "react";


// ---------- ASSET ------------

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

export const useSearchAssetsByPolygon = (polygon: string) => {
    const { data, isFetching } = useQuery({
        queryKey: [QUERY_KEY.GET_ASSETS_BY_POLYGON, polygon],
        queryFn: async ({ queryKey }) => {
            const [_key, polygon] = queryKey;
            if (!polygon) return [];
            const res = await assetService.searchAssetsByPolygon(polygon);
            return res.data;
        },
        enabled: !!polygon,
        refetchOnWindowFocus: false,
    });

    return {
        assetsByPolygon: data,
        isFetchingPolygon: isFetching
    }
}

// ---------- USER -------------

export const useUserInfo = (username: string) => {

    const { data, isFetching } = useQuery({
        queryKey: [QUERY_KEY.GET_USER_INFO, username],
        queryFn: async ({ queryKey }) => {
            const [_key, username] = queryKey;
            if (!username) return;
            const res = await userService.getUserInfo(username);
            return res.data;
        },
        enabled: !!username,
        refetchOnWindowFocus: false,
    })

    return {
        userInfoData: data,
        isFetchingUserInfo: isFetching
    }
}

// -------- AUTH TOKEN ---------

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

// ---------- POST -------------



// ---------- REVIEW -------------


//----------- AMENITY ------------

export const useSearchAmenities = (keyword: string) => {
    const { data, isFetching } = useQuery({
        queryKey: [QUERY_KEY.SEARCH_AMENITIES, keyword],
        queryFn: async ({ queryKey }) => {
            const [_key, keyword] = queryKey;
            const res = await searchService.searchAmenities(keyword);
            return res.data.content;
        },
        refetchOnWindowFocus: false,
        enabled: !!keyword
    });

    return {
        amenities: data,
        isFetching
    }
}

export const useGetLandlordInfo = () => {
    const { data, isFetching } = useQuery({
        queryKey: [],
        queryFn: async () => {
            const res = await voteService.getLandlordInfo(1);
            return res.data.content;
        },
        refetchOnWindowFocus: false,
    });

    return {
        landlordsData: data,
        isFetching
    }
}