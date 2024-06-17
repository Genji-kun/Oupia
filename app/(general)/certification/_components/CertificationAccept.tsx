"use client"

import { useAcceptCertification } from '@/hooks/mutation';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { notFound, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'sonner';

const CertificationAccept = () => {

    const params = useSearchParams();

    const { mutateAsync, isPending } = useAcceptCertification();

    useEffect(() => {
        if (!params.get("token")) {
            notFound();
        } else {
            handleAccept(params.get("token")!);
        }
    }, [params]);

    async function handleAccept(token: string) {
        try {
            await mutateAsync(token);
        } catch (error: any) {
            if (error.response.data.code == 2005)
                toast.error("Bạn không có quyền không danh sách chứng chỉ chủ trọ đã cấp.");
        }
    }

    return (
        <>
            {
                params.get("token") && <div className="w-full h-full flex flex-col items-center gap-4 my-6">
                    <Image
                        width={1000}
                        height={1000}
                        className="w-72 xl:w-1/3 aspect-square"
                        alt="Accept Certifications"
                        src={"https://res.cloudinary.com/dc1opyaq6/image/upload/v1718633210/Confirmed-rafiki_stdguj.png"} />
                    <h4 className="uppercase text-2xl font-semibold mb-4">Xác nhận thông tin chứng chỉ bạn đã nhận để đánh giá nhà trọ</h4>
                    {isPending && <Loader2 className='animate-spin text-primary h-12 w-12' />}
                </div>
            }
        </>
    )
}

export default CertificationAccept