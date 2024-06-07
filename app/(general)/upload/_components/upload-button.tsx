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

    const { asset, setAsset, post, setPost, images, postForm } = useUploadContext();

    const pathname = usePathname();

    const { mutateUploadPost, isPendingUploadPost } = useUploadPost();

    const handleSubmitPost = async (form: PostReq) => {
        const formData = new FormData();
        formData.append('post', new Blob([JSON.stringify(form)], { type: "application/json" }))
        const images = postForm.getValues("images");
        if (images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
        }
        await mutateUploadPost(formData);
    }


    const handleSubmitAsset = async () => {
        if (asset.assetName) {
            const form = new FormData();
            form.append('asset', new Blob([JSON.stringify(asset)], { type: "application/json" }))
            if (images.length > 0) {
                images.forEach((file) => {
                    form.append('images', file);
                });
            }
            try {
                const res = await authApi.post(assetsEndpoints["createAsset"], form);
                if (res.status === 200) {
                    toast.success("Thêm căn hộ thành công");
                    setAsset({});
                }
            } catch (error) {
                console.error(error);
                toast.error("Đã có lỗi xảy ra, vui lòng thử lại.");
            }
        } else {
            toast.error("Không được bỏ trống nội dung bài viết và loại bài viết.");
        }
    }

    const handleSubmit = () => {
        postForm.handleSubmit(handleSubmitPost)();
    }

    return (
        <div className="flex justify-center gap-2 mt-auto">
            <Button onClick={() => setPost({})} variant={"destructive"} className="w-fit p-6">
                <span>Xóa thông tin</span>
            </Button>
            <Button onClick={pathname === "/upload" ? handleSubmit : handleSubmitAsset} disabled={isPendingUploadPost} className="styled-button w-fit p-6">
                {
                    isPendingUploadPost ?
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span className="text-sm ml-1.5">Đang xử lý</span>
                        </>
                        :
                        <span className="text-sm">{pathname === "/upload" ? "Hoàn tất bài đăng" : "Thêm căn hộ mới"}</span>
                }
            </Button>
        </div>
    )
}

export default UploadButton