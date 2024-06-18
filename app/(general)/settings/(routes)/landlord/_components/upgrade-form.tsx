"use client"

import { Button } from '@/components/ui/button'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';

const AssetSubmitForm = dynamic(() => import("./asset-submit-form"), {
    ssr: false,
})

function UpgradeForm() {

    const [isEditting, setIsEditting] = useState<boolean>(false);
    const dispatch = useDispatch();

    // const handleUpgrade = async () => {
    //     setIsSubmitting(true);
    //     try {
    //         const res = await authApi.patch(userEndpoints["upgrade"]);
    //         if (res.status === 200) {
    //             try {
    //                 const resCurrUser = await authApi.get(authEndpoints["currentUser"]);
    //                 if (resCurrUser.status === 200) {
    //                     Cookies.set("user", JSON.stringify(resCurrUser.data));
    //                     dispatch(login(resCurrUser.data));
    //                     toast.success("Cập nhật tài khoản thành công.");
    //                 }
    //             } catch (error) {
    //                 console.error(error);
    //             }
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // }

    return (
        <div className="flex flex-col gap-4">
            {
                !isEditting &&
                <>
                    <h2 className="text-xl font-semibold">Các lợi ích</h2>
                    <ul className="text-muted-foreground list-disc px-10">
                        <li>Có thể đăng tải thông tin căn hộ.</li>
                        <li>Bạn có thể truy cập vào trang quản lý nhà trọ.</li>
                        <li>Cung cấp chứng chỉ cho người dùng đánh giá nhà trọ.</li>
                    </ul>
                    <Button onClick={() => setIsEditting((prev) => !prev)} className="styled-button w-fit gap-2" >
                        Bắt đầu
                    </Button>
                </>
            }

            {isEditting && <AssetSubmitForm />}
        </div>
    )
}

export default UpgradeForm