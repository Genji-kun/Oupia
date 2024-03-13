"use client"

import { Input } from '@/components/ui/input';
import { ChevronLeft, Loader } from 'lucide-react';
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
    const { user, setUser } = useSignUpContext();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            avatar: user ? user.avatar : undefined,
            username: user ? user.account?.username : "",
            password: user ? user.account?.password : "",
            confirm: user ? user.account?.confirm : "",
        },
    })

    const [avatar, setAvatar] = useState(user ? user.avatar : "");
    const [account, setAccount] = useState(user ? user.account : {});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { setTab } = useAuthTabContext();

    const fileInputRef = useRef(null);
    const handleFileChange = (evt: any) => {
        if (evt.target.files && evt.target.files[0]) {
            const file: File = evt.target.files[0];
            const fileURL = URL.createObjectURL(file);
            setAvatar(fileURL);
            setUser((current: any) => {
                return { ...current, avatar: fileURL };
            });
        }
    };

    console.log(user)


    useEffect(() => {
        const subscription = form.watch((values: any) => {
            for (const key in values) {
                if (values[key]) {
                    if (key === "username" || key === "password" || key === "confirm") {
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


    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        console.log(values);
        // Kiểm tra email đã tồn tại chưa

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
                                            className="text-base dark:bg-border/50"
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
                                    <Input {...field} type="text" disabled={isSubmitting} className="text-base  dark:bg-border/50" />
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
                                        <Input {...field} type="password" disabled={isSubmitting} togglePassword={true} className="text-base dark:bg-border/50" />
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
                                        <Input {...field} type="password" disabled={isSubmitting} togglePassword={true} className="text-base  dark:bg-border/50" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {isSubmitting ? <>
                        <Button disabled className=" ml-auto w-fit styled-button border-gray-200 border flex gap-3 ">
                            <span className="text-base">Đang xử lý</span>
                            <Loader size={4} />
                        </Button>
                    </> : <>
                        <div className="w-fit flex gap-x-2 items-center ml-auto pt-2">
                            <Button type="button" variant="ghost" className="flex items-center gap-x-1 w-fit p-4" onClick={() => setTab("info")}>
                                <ChevronLeft size="20" />
                                <span className="font-semibold text-base">Quay lại</span>
                            </Button>
                            <Button type="submit" className=" w-fit styled-button border-gray-200 border flex gap-2 px-6 py-4">
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