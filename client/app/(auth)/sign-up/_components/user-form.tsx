"use client"

import { Input } from '@/components/ui/input';
import { ChevronLeft, Loader, Loader2 } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import defaultAvatar from "@/public/user-avatar.png";
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod"
import { Button } from '@/components/ui/button';
import { useAuthTabContext } from '@/contexts/auth-tab-context';
import { useSignUpContext } from '@/contexts/sign-up-context';
import { publicApi } from '@/configs/axiosInstance';
import { authEndpoints } from '@/configs/axiosEndpoints';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    avatar: typeof File !== 'undefined' ? z.instanceof(File).optional() : z.any().optional(),
    username: z.string({
    }).min(6, {
        message: "Tên tài khoản ít nhất 6 ký tự"
    }),
    password: z.string({
        required_error: "Mật khẩu không được bỏ trống",
    }).min(8,
        { message: "Mật khẩu cần tối thiểu 8 ký tự" }
    ),
    confirm: z.string({
        required_error: "Mật khẩu xác nhận không được bỏ trống",
    }).min(8,
        { message: "Mật khẩu xác nhận cần tối thiểu 8 ký tự" }
    ),
})

const UserForm = () => {

    const router = useRouter();

    const { user, setUser, avatar, setAvatar, avatarFile, setAvatarFile } = useSignUpContext();
    const { setTab } = useAuthTabContext();

    const [account, setAccount] = useState(user ? user.account : {});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fileInputRef = useRef(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            avatar: avatarFile,
            username: user ? user.account?.username : "",
            password: user ? user.account?.password : "",
            confirm: user ? user.account?.confirm : "",
        },
    })

    useEffect(() => {
        const subscription = form.watch((values: any) => {
            for (const key in values) {
                if (values[key]) {
                    if (key === "username" || key === "password") {
                        setAccount((current: any) => {
                            return { ...current, [key]: values[key] };
                        });
                    }
                }
            }

        });
        return () => {
            subscription.unsubscribe();
        };
    }, [form]);

    useEffect(() => {
        setUser((current: any) => {
            return { ...current, account: account };
        });
    }, [account, setUser]);

    const handleFileChange = (evt: any) => {
        if (evt.target.files && evt.target.files[0]) {
            const file: File = evt.target.files[0];
            const fileURL = URL.createObjectURL(file);
            console.log(file.name)
            setAvatar(fileURL);
            setAvatarFile(file);
        }
    };

    const onSubmit = async () => {
        setIsSubmitting(true);
        if (user && avatarFile) {
            const form = new FormData();
            form.append('user', new Blob([JSON.stringify(user)], { type: "application/json" }))
            form.append("avatarFile", avatarFile);
            try {
                const res = await publicApi.post(authEndpoints["sign-up"], form);
                if (res.status === 200) {
                    toast.success("Đăng ký người dùng thành công");
                    router.push("/sign-in");
                }
            } catch (error) {
                console.error(error);
                toast.error("Đã có lỗi xảy ra, vui lòng thử lại.");
                setIsSubmitting(false);
            }
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="avatar"
                        render={() => (
                            <FormItem >
                                <FormLabel className="text-base font-semibold text-foreground">Ảnh người dùng</FormLabel>
                                <FormControl>
                                    <div className="flex gap-4 items-center">
                                        <div className="w-24 aspect-square">
                                            <Image
                                                src={avatar ? avatar : defaultAvatar}
                                                alt="Avatar"
                                                height={300}
                                                width={300}
                                                className="w-full h-full rounded-full object-cover border border-border"
                                            />
                                        </div>
                                        <Input
                                            type="file"
                                            accept='image/png, image/jpeg, image/jpg'
                                            multiple={false}
                                            disabled={isSubmitting}
                                            className="text-base dark:bg-oupia-sub"
                                            ref={fileInputRef}
                                            onChange={handleFileChange} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel className="text-base font-semibold text-foreground">Tên người dùng</FormLabel>
                                <FormControl>
                                    <Input {...field} type="text" disabled={isSubmitting} className="text-base  dark:bg-oupia-sub" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className="text-base font-semibold text-foreground">Mật khẩu</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" disabled={isSubmitting} togglePassword={true} className="text-base dark:bg-oupia-sub" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-semibold text-foreground">Mật khẩu xác nhận</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" disabled={isSubmitting} togglePassword={true} className="text-base  dark:bg-oupia-sub" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {isSubmitting ? <>
                        <div className="pt-2  ml-auto w-fit">
                            <Button disabled className=" styled-button flex gap-3 ">
                                <span className="text-base">Đang xử lý</span>
                                <Loader2 size="20" className="animate-spin" />
                            </Button>
                        </div>
                    </> : <>
                        <div className="w-fit flex gap-x-2 items-center ml-auto pt-2">
                            <Button type="button" variant="ghost" className="flex items-center gap-x-1 w-fit p-4" onClick={() => setTab("info")}>
                                <ChevronLeft size="20" />
                                <span className="font-semibold text-base">Quay lại</span>
                            </Button>
                            <Button type="submit" className=" w-fit styled-button flex gap-2 px-6 py-4">
                                <span className="text-base">Hoàn thành đăng ký</span>
                            </Button>
                        </div>
                    </>}

                </form>
            </Form>
        </div >
    );
};

export default UserForm;