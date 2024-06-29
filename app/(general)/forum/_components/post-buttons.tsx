import { Button } from '@/components/ui/button';
import { favouriteEndpoints } from '@/configs/axiosEndpoints';
import { authApi } from '@/configs/axiosInstance';
import { usePostFavouriteContext } from '@/contexts/post-favourite-context';
import { PostResponse } from '@/lib/interfaces/Post';
import { isUndefined } from 'lodash-es';
import { MessageSquareText } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';


const PostButtons = ({ post }: { post: PostResponse }) => {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);
    const { setTotalFavourTemp, isLoading, setIsLoading, commentInputRef } = usePostFavouriteContext();

    const [isFavourited, setIsFavourited] = useState<boolean>(false);
    const [favourResult, setFavourResult] = useState<boolean>(false);

    const [debouncedFavourTemp] = useDebounce(isFavourited, 1000);

    const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
    const hasFetchedFavour = useRef(false);


    useEffect(() => {
        const fetchIsFavourite = async () => {
            try {
                const res = await authApi.get(favouriteEndpoints["checkFavourite"], {
                    params: {
                        postId: post.id,
                    }
                });
                setIsFavourited(res.data);
                setFavourResult(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        if (currentUser && post) {
            fetchIsFavourite();
        }
    }, [currentUser, post, setIsLoading])


    useEffect(() => {
        const addFavour = async () => {
            try {
                await authApi.post(favouriteEndpoints["saveFavour"], {}, {
                    params: {
                        postId: post.id
                    }
                });
                console.log('addFavour has been called'); // Thêm lệnh console.log
                hasFetchedFavour.current = false;
            } catch (error) {
                console.error(error);
            }
        }

        const removeFavour = async () => {
            try {
                await authApi.delete(favouriteEndpoints["unFavourite"], {
                    params: {
                        postId: post.id
                    }
                });
                console.log('removeFavour has been called'); // Thêm lệnh console.log
                hasFetchedFavour.current = false;
            } catch (error) {
                console.error(error);
            }
        }

        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }

        if (!hasFetchedFavour.current) {
            if (debouncedFavourTemp && !favourResult) {
                addFavour();
                hasFetchedFavour.current = true;
            }
            else if (!debouncedFavourTemp && favourResult) {
                removeFavour();
                hasFetchedFavour.current = true;
            }
        }
    }, [debouncedFavourTemp])

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
                                                setIsFavourited(prev => !prev);
                                                setTotalFavourTemp(prev => prev - 1);
                                            }}
                                            variant={"ghost"}
                                            className="flex gap-x-2 px-3 h-fit text-heart hover:text-hover">
                                            <RiHeart3Fill size="20" />
                                            <span className="text-sm font-semibold">Thích</span>
                                        </Button>
                                        :
                                        <Button
                                            onClick={() => {
                                                setIsFavourited(prev => !prev);
                                                setTotalFavourTemp(prev => prev + 1);
                                            }}
                                            variant={"ghost"}
                                            className="flex gap-x-2 px-3 h-fit hover:text-hover" >
                                            <RiHeart3Line size="20" />
                                            <span className="text-sm font-semibold">Thích</span>
                                        </Button >}
                                <Button onClick={() => commentInputRef.current?.focus()} variant={"ghost"} className="flex gap-x-2 px-3 h-fit">
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