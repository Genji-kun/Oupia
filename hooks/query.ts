import { QUERY_KEY } from "@/lib/constants/QueryKeys"
import { authService } from "@/services/AuthService"
import { useQuery } from "@tanstack/react-query"

export const useCurrentUserInfo = () => {
    const { data, isFetching, isError } = useQuery({
        queryKey: [QUERY_KEY.CURRENT_USER],
        queryFn: async () => {
            const res = await authService.getToken()
            return res.data;
        },
        staleTime: Infinity
    });

    return {
        currentUserInfo: data!,
        isFetchingCurrentUserInfo: isFetching,
        isErrorCurrentUserInfo: isError
    };
}