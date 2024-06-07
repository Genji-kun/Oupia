"use client"

import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea';
import { useUploadContext } from '@/contexts/upload-context';
import { UploadCloudIcon, X } from 'lucide-react';

import dynamic from 'next/dynamic'
import Image from 'next/image';
import React, { useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSelector } from 'react-redux';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const AmenityInput = dynamic(() => import('./amenity-input'), { ssr: false });
const TagsInputs = dynamic(() => import('./tags-inputs'), { ssr: false });

function UploadForumForm() {

    const { post, setAmenities, setTagLocation, setTagPrice, tagAsset, setTagAsset, postForm } = useUploadContext();
    const { currentUser } = useSelector((state: any) => state.currentUserSlice);

    const watchPostType = postForm.watch("postType");

    useEffect(() => {
        const handlePostTypeChange = (value: string) => {
            switch (value) {
                case "POST_COMMON":
                    setAmenities([]);
                    setTagLocation(undefined);
                    setTagPrice(undefined);
                    setTagAsset(undefined);
                    break;
                case "POST_FIND":
                    setTagAsset(undefined);
                    break;
                default:
                    break;
            }
        }
        handlePostTypeChange(watchPostType);
    }, [watchPostType]);

    const handleFileChange = (evt: any) => {
        const newFiles = Array.prototype.slice.call(evt.target.files);
        postForm.setValue("images", [...postForm.getValues("images"), ...newFiles]);
    }

    const handleDelete = (file: File) => {
        postForm.setValue("images", postForm.getValues("images").filter((f: File) => f !== file));
    }

    return (
        <Form  {...postForm}>
            <form className="flex flex-col gap-4 py-2 pb-4">
                <div>
                    <h4 className="text-xl font-semibold">Thông tin bài viết</h4>
                    <span className="text-sm text-muted-foreground">Thông tin bài viết sẽ được hiển thị trên trang diễn đàn.</span>
                </div>
                <Separator />
                <span className="font-semibold text-lg">Loại bài viết</span>
                <FormField
                    control={postForm.control}
                    name="postType"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="dark:bg-oupia-sub">
                                        <SelectValue placeholder="Bạn đăng bài viết này với mục đích gì?" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="POST_COMMON">Đăng bài viết thông thường</SelectItem>
                                        <SelectItem value="POST_FIND">Tìm kiếm căn hộ</SelectItem>
                                        {currentUser.role !== "ROLE_TENANT" && <SelectItem value="POST_RENT">Cho thuê</SelectItem>}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <span className="font-semibold text-lg">Nội dung bài viết</span>
                <FormField
                    control={postForm.control}
                    name="postContent"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    rows={5}
                                    placeholder='Nhập nội dung...'
                                    className="dark:bg-oupia-sub"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {postForm.getValues("postType") && postForm.getValues("postType") !== "POST_COMMON" &&
                    <>
                        <span className="font-semibold text-lg">{post.postType === "POST_FIND" ? "Tiện ích yêu cầu" : "Tiện ích của căn hộ"}</span>
                        <AmenityInput />
                    </>
                }
                {postForm.getValues("postType") && postForm.getValues("postType") !== "POST_COMMON" &&
                    <>
                        <span className="font-semibold text-lg">Các tag đính kèm trong bài đăng</span>
                        <TagsInputs />
                    </>
                }
                {
                    !tagAsset &&
                    <>

                        <span className="font-semibold text-lg">Hình ảnh</span>
                        <FormField
                            control={postForm.control}
                            name="images"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex w-full justify-center rounded-lg border border-dashed dark:border-muted-foreground border-muted-foreground px-6 py-10 dark:bg-oupia-base">
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
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                }
                {
                    postForm.getValues("images")?.length > 0 && (
                        <div className="flex flex-wrap gap-5 items-center pt-4">
                            {postForm.getValues("images")?.map((image: File, index: number) => (
                                <div key={index} className="col-span-1 relative ">
                                    <X className="text-destructive font-bold w-6 h-6 p-1 bg-background hover:bg-border dark:hover:bg-oupia-sub dark:bg-oupia-base rounded-full absolute -right-2 -top-2 cursor-pointer" onClick={() => handleDelete(image)} />
                                    <Image width={500} height={500} className="rounded-lg object-cover w-32 aspect-square" src={URL.createObjectURL(image)} alt={image.name} />
                                </div>
                            ))}
                        </div>)
                }
            </form>
        </Form >
    )
}

export default UploadForumForm;