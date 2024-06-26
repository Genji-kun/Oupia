"use client"

import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { UserRole } from '@/lib/types/enums';

const AssetSubmitForm = dynamic(() => import("./asset-submit-form"), {
    ssr: false,
})

function UpgradeForm() {

    const [isEditting, setIsEditting] = useState<boolean>(false);
    const { currentUser } = useSelector((state: any) => state.currentUserSlice);

    return (
        <div className="flex flex-col gap-4">
            {
                currentUser?.role === UserRole.TENANT ? <>
                    {
                        !isEditting &&
                        <>
                            <h2 className="text-xl font-semibold">Các lợi ích khi bạn trở thành chủ nhà trọ</h2>
                            <ul className="text-muted-foreground list-disc px-10">
                                <li>Có thể đăng tải thông tin căn hộ.</li>
                                <li>Bạn có thể truy cập vào trang quản lý nhà trọ.</li>
                                <li>Cung cấp chứng chỉ cho người dùng đánh giá nhà trọ.</li>
                            </ul>
                            <Button onClick={() => setIsEditting((prev) => !prev)} className="styled-button w-fit gap-2" >
                                Bắt đầu xác nhận
                            </Button>
                        </>

                    }
                    {isEditting && <AssetSubmitForm />}

                </> : <>
                    <Image
                        className='w-96 aspect-square object-cover mx-auto'
                        height={500} width={500}
                        src="https://res.cloudinary.com/dfk0sid7z/image/upload/v1718816106/Completed-bro_1_jnk06n.png"
                        alt="Success"
                    />
                    <h2 className='text-2xl text-center font-semibold text-muted-foreground'>Tài khoản của bạn đã là chủ nhà trọ</h2>
                </>
            }
        </div>
    )
}

export default UpgradeForm;