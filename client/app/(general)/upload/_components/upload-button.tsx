"use client"

import { Button } from '@/components/ui/button'
import { postEndpoints } from '@/configs/axiosEndpoints';
import { authApi } from '@/configs/axiosInstance';
import { useUploadContext } from '@/contexts/upload-context'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

function UploadButton() {

    const { post, setPost, images } = useUploadContext();
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        if (post.postContent && post.postType) {
            const form = new FormData();
            form.append('post', new Blob([JSON.stringify(post)], { type: "application/json" }))
            if (images.length > 0) {
                images.forEach((file) => {
                    form.append('images', file);
                });
            }
            try {
                const res = await authApi.post(postEndpoints["posts"], form);
                if (res.status === 200) {
                    toast.success("Thêm bài viết thành công");
                    setPost({});
                    setIsSubmitting(false);
                }
            } catch (error) {
                console.error(error);
                toast.error("Đã có lỗi xảy ra, vui lòng thử lại.");
                setIsSubmitting(false);
            }
        } else {
            toast.error("Không được bỏ trống nội dung bài viết và loại bài viết.");
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex justify-center gap-2 mt-auto">
            <Button onClick={() => setPost({})} variant={"destructive"} className="w-fit p-6">
                <span>Xóa thông tin</span>
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting} className="styled-button w-fit p-6">
                <span className="text-sm">Hoàn tất bài đăng</span>
            </Button>
        </div>
    )
}

export default UploadButton