"use client";

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
    oldPassword: z.string().min(5, { message: "Họ tên không được nhỏ hơn 5 ký tự" }).max(50, { message: "Họ tên không quá 50 ký tự" }),
},)


const PasswordForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditting, setIsEditting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            oldPassword: "",
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="styled-form ">
                <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                        <FormItem className={`${!isEditting && "hidden"}`}>
                            <FormLabel className="text-base">Mật khẩu hiện tại</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={!isEditting || isSubmitting}
                                    className="" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                        <FormItem className={`${!isEditting && "hidden"}`}>
                            <FormLabel className="text-base">Mật khẩu mới</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={!isEditting || isSubmitting}
                                    className="" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                        <FormItem className={`${!isEditting && "hidden"}`}>
                            <FormLabel className="text-base">Xác nhận mật khẩu</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={!isEditting || isSubmitting}
                                    className="" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {
                    isEditting ? <div className="flex gap-x-2">
                        <Button className="styled-button" type="submit">Hoàn tất</Button>
                        <Button onClick={() => setIsEditting(false)} variant="ghost" type="button">Hủy</Button>
                    </div> : <>
                        <div className="flex flex-col gap-y-5 mt-0">
                            <p>Lần cuối mật khẩu được thay đổi là 10 phút trước</p>
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