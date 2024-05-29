import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button'
import { followEndpoints } from '@/configs/axiosEndpoints';
import { authApi } from '@/configs/axiosInstance';
import { useProfileContext } from '@/contexts/profile-context';
import { isUndefined } from 'lodash-es';
import { Edit3Icon, Loader2, MessagesSquareIcon, UserRoundCheckIcon } from 'lucide-react'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner';

function UserHeaderButtons() {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);
    const { userInfoData } = useProfileContext();

    const [isFollowing, setIsFollowing] = useState<boolean | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (currentUser) {
            fetchIsFollowing();
        }
    }, [])

    const fetchIsFollowing = async () => {
        try {
            const res = await authApi.get(followEndpoints["checkFollow"], {
                params: {
                    followerId: currentUser.id,
                    followingId: userInfoData?.id
                }
            });
            setIsFollowing(res.data);
        } catch (error) {
            console.error(error)
        }
    }

    const handleFollow = async () => {
        if (currentUser && userInfoData) {
            setIsLoading(true);
            try {
                const res = await authApi.post(followEndpoints["followUser"], {}, {
                    params: {
                        followingId: Number(userInfoData?.id),
                    }
                });
                if (res.status === 200) {
                    toast.success("Theo dõi người dùng thành công.");
                    // setUserInfo({ ...userInfo, totalFollower: userInfo.totalFollower + 1 });
                    setIsFollowing(true);
                }
            } catch (error) {
                toast.error("Đã có lỗi xảy ra, vui lòng thử lại.");
                setIsFollowing(false);
            } finally {
                setIsLoading(false);
            }

        }
    }

    const handleUnFollow = async () => {
        if (currentUser && userInfoData) {
            setIsLoading(true);
            try {
                const res = await authApi.delete(followEndpoints["unFollow"], {
                    params: {
                        followingId: Number(userInfoData?.id),
                    }
                });
                if (res.status === 200 || res.status === 204) {
                    toast.success("Bỏ theo dõi người dùng thành công.")
                    // setUserInfo({ ...userInfo, totalFollower: userInfo.totalFollower - 1 });
                    setIsFollowing(false);
                }
            } catch (error) {
                toast.error("Đã có lỗi xảy ra, vui lòng thử lại.");
                setIsFollowing(true);
            } finally {
                setIsLoading(false);
            }

        }
    }


    if (!currentUser) {
        return <></>
    }

    return (
        <div className="flex w-full justify-center xl:justify-end items-center gap-2 ">
            <>
                {
                    userInfoData?.id === currentUser.id ? <>
                        <Link href={`/settings/account`}>
                            <Button className="styled-button flex gap-x-2">
                                <Edit3Icon size={16} />
                                <span>Chỉnh sửa thông tin</span>
                            </Button>
                        </Link>
                    </> : <>
                        {!isUndefined(isFollowing) ? (
                            isFollowing ?
                                <AlertDialog>
                                    <AlertDialogTrigger>
                                        <Button disabled={isLoading} variant={"outline"} className="font-semibold text-base text-muted-foreground hover:text-muted-foreground flex w-fit h-fit transition-all">
                                            {isLoading ? <>
                                                <Loader2 size={22} className="animate-spin" />
                                            </> : <>
                                                <UserRoundCheckIcon size={16} />
                                                <span className="ml-2">Đang theo dõi</span>
                                            </>}
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Bỏ theo dõi người dùng này?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Bạn sẽ không được nhận thông báo khi người dùng này đăng bài nữa. Bạn có chắc chắn không?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={handleUnFollow}
                                                className="bg-destructive/70 hover:bg-destructive text-destructive-foreground">Bỏ theo dõi</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                                : <Button onClick={handleFollow} disabled={isLoading} variant={"ghost"} className="font-semibold bg-border/80 hover:bg-border text-base flex w-fit h-fit transition-all">
                                    {isLoading ? <>
                                        <Loader2 size={22} className="animate-spin" />
                                    </> : <>
                                        <UserRoundCheckIcon size={16} />
                                        <span className="ml-2">Theo dõi</span>
                                    </>}
                                </Button>
                        ) : <div className="bg-border dark:bg-oupia-base px-16 py-5 animate-pulse rounded-lg"></div>
                        }

                        <Link href={`/messages/${userInfoData?.username}`}>
                            <Button className="styled-button flex gap-x-2">
                                <MessagesSquareIcon size={16} />
                                <span>Nhắn tin</span>
                            </Button>
                        </Link>
                    </>
                }
            </>
        </div>
    )
}

export default UserHeaderButtons;