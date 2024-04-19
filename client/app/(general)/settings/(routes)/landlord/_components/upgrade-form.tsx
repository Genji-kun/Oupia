"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { authEndpoints, userEndpoints } from '@/configs/axiosEndpoints';
import { authApi } from '@/configs/axiosInstance';
import { Loader2 } from 'lucide-react';

import cookies from "react-cookies";
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/currentUserSlice';

function UpgradeForm() {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleUpgrade = async () => {
        setIsSubmitting(true);
        try {
            const res = await authApi.patch(userEndpoints["upgrade"]);
            if (res.status === 200) {
                try {
                    const resCurrUser = await authApi.get(authEndpoints["currentUser"]);
                    if (resCurrUser.status === 200) {
                        cookies.save("user", resCurrUser.data, {});
                        dispatch(login(resCurrUser.data));
                        toast.success("Cập nhật tài khoản thành công.");
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Các lợi ích</h2>
            <ul className="text-muted-foreground list-disc px-10">
                <li>Có thể đăng tải thông tin căn hộ.</li>
                <li>Đính kèm thông tin căn hộ bên trong bài viết cho thuê.</li>
            </ul>
            {/*
            <AlertDialog>
                <AlertDialogTrigger asChild> */}
            <Button onClick={handleUpgrade} className="styled-button w-fit gap-2" disabled={isSubmitting}>
                {
                    isSubmitting ?
                        <>
                            <span className="text-sm">Đang xử lý</span>
                            <Loader2 size="16" className="animate-spin" />
                        </>
                        :
                        <>
                            <span className="text-sm">
                                Nâng cấp tài khoản
                            </span>
                        </>
                }

            </Button>

            {/* </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác thực đó là ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog> */}

        </div>
    )
}

export default UpgradeForm