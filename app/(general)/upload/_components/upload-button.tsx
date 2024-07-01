"use client"

import { Button } from '@/components/ui/button'
import { PostReq, useUploadContext } from '@/contexts/upload-context'
import { useUploadPost } from '@/hooks/mutation';
import { Loader2 } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

function UploadButton() {

    const { postForm, amenities, tagLocation, tagAsset, tagPrice } = useUploadContext();


    const { mutateUploadPost, isPendingUploadPost } = useUploadPost();

    const handleSubmitPost = async (form: PostReq) => {
        let req: any = {
            postType: form.postContent,
            postContent: form.postContent,
        }
        if (form.postType !== "POST_COMMON") {
            if (tagAsset) {
                req.assetId = tagAsset.id
            }
            if (tagLocation) {
                req.tagLocation = tagLocation
            }
            if (tagPrice) {
                req.tagPrice = tagPrice
            }
            if (amenities.length) {
                req.amenities = amenities
            }
        }

        const formData = new FormData();
        formData.append('post', new Blob([JSON.stringify(req)], { type: "application/json" }))
        if (form.images.length > 0) {
            form.images.forEach(image => {
                formData.append('images', image);
            })
        }
        try {
            await mutateUploadPost(formData);
            postForm.reset();
        } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau.")
        }
    }

    return (
        <div className="flex justify-center gap-2 mt-auto">
            <Button onClick={() => { postForm.reset(); }} variant={"destructive"} className="w-fit p-6">
                <span>Xóa thông tin</span>
            </Button>
            <Button onClick={() => postForm.handleSubmit(handleSubmitPost)()} disabled={isPendingUploadPost} className="styled-button w-fit p-6">
                <span className="text-sm">
                    {isPendingUploadPost ? "Đang xử lý" : "Hoàn tất bài đăng"}
                    {isPendingUploadPost && <Loader2 className="w-5 h-5 ml-2 animate-spin" />}
                </span>
            </Button>
        </div>
    )
}

export default UploadButton;