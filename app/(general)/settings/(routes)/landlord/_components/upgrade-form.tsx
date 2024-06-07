"use client"

import { Button } from '@/components/ui/button'
import { authEndpoints, userEndpoints } from '@/configs/axiosEndpoints';
import { authApi } from '@/configs/axiosInstance';
import { Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';
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
                        Cookies.set("user", JSON.stringify(resCurrUser.data));
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
            <h2 className="text-xl font-semibold">Các lợi ích</h2>
            <ul className="text-muted-foreground list-disc px-10">
                <li>Có thể đăng tải thông tin căn hộ.</li>
                <li>Đính kèm thông tin căn hộ bên trong bài viết cho thuê.</li>
            </ul>
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
        </div>
    )
}

export default UpgradeForm