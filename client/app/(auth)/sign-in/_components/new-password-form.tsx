"use client";

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loader from '@/components/ui/loader';
import { ChevronLeft } from 'lucide-react';
import { useAuthTabContext } from '@/contexts/auth-tab-context';

const passwordSchema = z.string()
    .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
    .max(50, { message: "Mật khẩu không được quá 50 ký tự" })
    .refine(value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value), {
        message: "Mật khẩu phải chứa ít nhất một chữ hoa, chữ thường, số và ký tự đặc biệt"
    });

const formSchema = z.object({
    newPassword: passwordSchema,
    confirmPassword: z.string()
}).superRefine((data, ctx) => {
    if (data.confirmPassword !== data.newPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['confirmPassword'],
            message: 'Mật khẩu xác nhận phải trùng với mật khẩu mới',
        });
    }
});


const NewPasswordForm = () => {
    const {setTab} = useAuthTabContext();
    const [isSubmiting, setIsSubmiting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: ""
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setIsSubmiting(true);
        console.log(values);
        setTab("sign-in");
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="styled-form ">
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">Mật khẩu mới</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={isSubmiting}
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
                        <FormItem>
                            <FormLabel className="text-base">Mật khẩu xác nhận</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={isSubmiting}
                                    type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {isSubmiting ? <>
                    <Button disabled type="submit" className=" ml-auto w-fit styled-button flex gap-2">
                        <span className="text-base">Đang xử lý</span>
                        <Loader size={4} />
                    </Button>
                </> : <>
                    <div className="w-fit flex gap-x-2 items-center ml-auto">
                        <Button type="button" variant="ghost" className="flex items-center gap-x-1 w-fit" onClick={() => setTab("forget-password")}>
                            <ChevronLeft size="20" />
                            <span className="font-semibold text-base">Quay lại</span>
                        </Button>
                        <Button type="submit" className=" w-fit styled-button flex gap-2">
                            <span className="text-base">Đổi mật khẩu</span>
                        </Button>
                    </div>
                </>}
            </form>
        </Form>
    );
};

export default NewPasswordForm;