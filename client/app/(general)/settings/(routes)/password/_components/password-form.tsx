"use client";

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loader from '@/components/ui/loader';

const passwordSchema = z.string()
    .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
    .max(50, { message: "Mật khẩu không được quá 50 ký tự" })
    .refine(value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value), {
        message: "Mật khẩu phải chứa ít nhất một chữ hoa, chữ thường, số và ký tự đặc biệt"
    });

const formSchema = z.object({
    password: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: z.string()
}).superRefine((data, ctx) => {
    if (data.newPassword === data.password) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['newPassword'],
            message: 'Mật khẩu mới không được trùng với mật khẩu cũ',
        });
    }

    if (data.confirmPassword !== data.newPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['confirmPassword'],
            message: 'Mật khẩu xác nhận phải trùng với mật khẩu mới',
        });
    }
});


const PasswordForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditting, setIsEditting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            newPassword: "",
            confirmPassword: ""
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        console.log(values);
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="styled-form ">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className={`${!isEditting && "hidden"}`}>
                            <FormLabel className="text-base">Mật khẩu hiện tại</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={!isEditting || isSubmitting}
                                    type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem className={`${!isEditting && "hidden"}`}>
                            <FormLabel className="text-base">Mật khẩu mới</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={!isEditting || isSubmitting}
                                    type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem className={`${!isEditting && "hidden"}`}>
                            <FormLabel className="text-base">Mật khẩu xác nhận</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={!isEditting || isSubmitting}
                                    type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {
                    isEditting ? <div className="flex gap-x-2">{
                        !isSubmitting ? <Button className="styled-button" type="submit">Cập nhật</Button> :
                            <Button className="styled-button gap-3" disabled>
                                <span>
                                    Đang cập nhật
                                </span>
                                <Loader size={4} />
                            </Button>
                    }
                        <Button onClick={() => setIsEditting(false)} variant="ghost" type="button">Hủy</Button>
                    </div> : <>
                        <div className="flex flex-col gap-y-5 -translate-y-5">
                            <p className="text-gray-700 dark:text-gray-400">Lần cuối mật khẩu được thay đổi là 10 phút trước</p>
                            <Button onClick={() => setIsEditting(true)} type="button" className="styled-button w-fit">
                                Đổi mật khẩu mới
                            </Button>
                        </div>
                    </>

                }


            </form>
        </Form>
    );
};

export default PasswordForm;