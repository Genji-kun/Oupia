"use client"

import { Button } from '@/components/ui/button'
import { assetsEndpoints } from '@/configs/axiosEndpoints';
import { authApi } from '@/configs/axiosInstance';
import { PostReq, useUploadContext } from '@/contexts/upload-context'
import { useUploadPost } from '@/hooks/mutation';
import { Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

function UploadButton() {

    const { postForm } = useUploadContext();


    const { mutateUploadPost, isPendingUploadPost } = useUploadPost();

    const handleSubmitPost = async (form: PostReq) => {
        const formData = new FormData();
        const { images, ...req } = form;
        formData.append('post', new Blob([JSON.stringify(req)], { type: "application/json" }))
        if (images.length > 0) {
            images.forEach(image => {
                formData.append('images[]', image);
            })
        }
        try {
            await mutateUploadPost(formData);
        } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau.")
        }
    }


    // const handleSubmitAsset = async () => {
    //     if (asset.assetName) {
    //         const form = new FormData();
    //         form.append('asset', new Blob([JSON.stringify(asset)], { type: "application/json" }))
    //         if (images.length > 0) {
    //             images.forEach((file) => {
    //                 form.append('images', file);
    //             });
    //         }
    //         try {
    //             const res = await authApi.post(assetsEndpoints["createAsset"], form);
    //             if (res.status === 200) {
    //                 toast.success("Thêm căn hộ thành công");
    //                 setAsset({});
    //             }
    //         } catch (error) {
    //             console.error(error);
    //             toast.error("Đã có lỗi xảy ra, vui lòng thử lại.");
    //         }
    //     } else {
    //         toast.error("Không được bỏ trống nội dung bài viết và loại bài viết.");
    //     }
    // }

    return (
        <div className="flex justify-center gap-2 mt-auto">
            <Button onClick={() => { postForm.reset(); }} variant={"destructive"} className="w-fit p-6">
                <span>Xóa thông tin</span>
            </Button>
            <Button onClick={() => postForm.handleSubmit(handleSubmitPost)()} disabled={isPendingUploadPost} className="styled-button w-fit p-6">
                {
                    isPendingUploadPost ?
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span className="text-sm ml-1.5">Đang xử lý</span>
                        </>
                        :
                        <span className="text-sm">Hoàn tất bài đăng</span>
                }
            </Button>
        </div>
    )
}

export default UploadButton;