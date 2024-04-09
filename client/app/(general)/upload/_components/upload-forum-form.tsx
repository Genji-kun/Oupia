"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea';
import { useUploadContext } from '@/contexts/upload-context';
import { UploadCloudIcon, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import TagsInputs from './tags-inputs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function UploadForumForm() {

    const { post, setPost, images, setImages } = useUploadContext();

    const handleFileChange = (evt: any) => {
        const newFiles = Array.prototype.slice.call(evt.target.files);
        setImages((current: any) => [...(current || []), ...newFiles]);
    }

    const handleFormChange = (field: string, value: any) => {
        setPost((current: any) => {
            return {
                ...current,
                [field]: value,
            }
        })
    }

    const handleDelete = (file: File) => {
        setImages((images: File[]) => images.filter((f) => f !== file));
    }

    return (
        <div className="flex flex-col gap-4 py-2 pb-4">
            <div>
                <h4 className="text-xl font-semibold">Thông tin bài viết</h4>
                <span className="text-sm text-muted-foreground">Thông tin bài viết sẽ được hiển thị trên trang diễn đàn.</span>
            </div>
            <Separator />
            <Accordion type="multiple" className="w-full">
                <AccordionItem value="type">
                    <AccordionTrigger>
                        <span className="font-semibold text-lg">Loại bài viết</span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <Select onValueChange={value => setPost((current: any) => { return { ...current, postType: value } })}>
                            <SelectTrigger className="dark:bg-oupia-sub">
                                <SelectValue placeholder="Bạn đăng bài viết này với mục đích gì?" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="POST_COMMON">Đăng bài viết thông thường</SelectItem>
                                <SelectItem value="POST_FIND">Tìm kiếm căn hộ</SelectItem>
                                <SelectItem value="POST_RENT">Cho thuê</SelectItem>
                            </SelectContent>
                        </Select>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="infomation">
                    <AccordionTrigger>
                        <span className="font-semibold text-lg">Nội dung bài viết</span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <Textarea
                            rows={5}
                            placeholder='Nhập nội dung...'
                            className="dark:bg-oupia-sub"
                            value={post.postContent}
                            name="postContent"
                            onChange={(evt) => handleFormChange(evt.target.name, evt.target.value)}
                        />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="hash-tag">
                    <AccordionTrigger>
                        <span className="font-semibold text-lg">Các tag đính kèm trong bài đăng</span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <TagsInputs />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="images">
                    <AccordionTrigger>
                        <span className="font-semibold text-lg">Hình ảnh</span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex w-full justify-center rounded-lg border border-dashed dark:border-muted-foreground border-muted-foreground px-6 py-10 dark:bg-oupia-sub">
                            <div className="text-center relative">
                                <UploadCloudIcon className="mx-auto h-12 w-12" aria-hidden="true" />
                                <div className="mt-4 flex text-muted-foreground text-base">
                                    <label
                                        htmlFor="assetImages"
                                        className="relative cursor-pointer rounded-md text-primary hover:text-primary-700 hover:underline"
                                    >
                                        <span>Tải lên file</span>
                                        <Input
                                            id="assetImages"
                                            name="assetImages"
                                            type="file"
                                            multiple
                                            className="sr-only"
                                            accept="image/png, image/jpeg"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                    <p className="pl-1">hoặc kéo thả từ thư mục</p>
                                </div>
                                <p className="text-sm">Chỉ nhận ảnh PNG, JPG</p>
                            </div>
                        </div>
                        {images.length !== 0 && (
                            <div className="flex flex-wrap gap-5 items-center pt-4">
                                {images.map((image, index) => (
                                    <div key={index} className="col-span-1 relative ">
                                        <X className="text-destructive font-bold w-6 h-6 p-1 bg-background hover:bg-border dark:hover:bg-oupia-sub dark:bg-oupia-base rounded-full absolute -right-2 -top-2 cursor-pointer" onClick={() => handleDelete(image)} />
                                        <Image width={500} height={500} className="rounded-lg object-cover w-32 aspect-square" src={URL.createObjectURL(image)} alt={image.name} />
                                    </div>
                                ))}
                            </div>)}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default UploadForumForm;