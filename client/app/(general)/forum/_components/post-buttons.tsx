import { Button } from '@/components/ui/button';
import { favouriteEndpoints } from '@/configs/axiosEndpoints';
import { authApi } from '@/configs/axiosInstance';
import { usePostFavouriteContext } from '@/contexts/post-favourite-context';
import { useDebounce } from '@/hooks/useDebounce';
import { PostResponse } from '@/interfaces/Post';
import { isUndefined } from 'lodash-es';
import { MessageSquareText } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { useSelector } from 'react-redux';


const PostButtons = ({ post }: { post: PostResponse }) => {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);
    const { setTotalFavourites, isLoading, setIsLoading } = usePostFavouriteContext();

    const [isFavourited, setIsFavourited] = useState<boolean>(false);
    const [currFavour, setCurrFavour] = useState<boolean | undefined>();
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

    const handleDebounceFavourite = useDebounce(async () => {
        setCurrFavour(isFavourited);
    }, 1000);

    useEffect(() => {
        const fetchIsFavourite = async () => {
            try {
                const res = await authApi.get(favouriteEndpoints["checkFavourite"], {
                    params: {
                        postId: post.id,
                    }
                });
                setIsFavourited(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        if (currentUser && post) {
            fetchIsFavourite();
        }
    }, [currentUser, post])

    useEffect(() => {
        isFavourited ? setTotalFavourites(prev => prev + 1) : setTotalFavourites(prev => prev - 1);
        handleDebounceFavourite();
    }, [isFavourited, handleDebounceFavourite])

    useEffect(() => {
        const addFavour = async () => {
            try {
                await authApi.post(favouriteEndpoints["saveFavour"], {}, {
                    params: {
                        postId: post.id
                    }
                });
            } catch (error) {
                console.error(error);
            } finally { }
        }

        const removeFavour = async () => {
            try {
                await authApi.delete(favouriteEndpoints["unFavourite"], {
                    params: {
                        postId: post.id
                    }
                });
            } catch (error) {
                console.error(error);
            } finally { }
        }

        if (!isUndefined(currFavour) && !isFirstRender) {
            currFavour ? addFavour() : removeFavour();
        }
    }, [currFavour])

    return (
        <>
            {
                isLoading ? <div className="flex gap-1">
                    <div className="bg-border dark:bg-oupia-sub py-4 px-12 animate-pulse rounded"></div>
                    <div className="bg-border dark:bg-oupia-sub py-4 px-12 animate-pulse rounded"></div>
                </div> :
                    <>
                        {
                            currentUser &&
                            <div className="flex gap-1">
                                {
                                    isFavourited ?
                                        <Button
                                            onClick={() => {
                                                setIsFirstRender(false);
                                                setIsFavourited(prev => !prev);
                                            }}
                                            variant={"ghost"}
                                            className="flex gap-x-2 px-3 h-fit text-heart hover:text-hover">
                                            <RiHeart3Fill size="20" />
                                            <span className="text-sm font-semibold">Thích</span>
                                        </Button>
                                        :
                                        <Button
                                            onClick={() => {
                                                setIsFirstRender(false);
                                                setIsFavourited(prev => !prev);
                                            }}
                                            variant={"ghost"}
                                            className="flex gap-x-2 px-3 h-fit hover:text-hover" >
                                            <RiHeart3Line size="20" />
                                            <span className="text-sm font-semibold">Thích</span>
                                        </Button >}
                                <Button variant={"ghost"} className="flex gap-x-2 px-3 h-fit">
                                    <MessageSquareText size="20" />
                                    <span className="text-sm font-semibold">Bình luận</span>
                                </Button>
                            </div >
                        }
                    </>
            }

        </>


    );
};

export default PostButtons;