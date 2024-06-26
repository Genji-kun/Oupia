"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Loader from "@/components/ui/loader";

const formSchema = z.object({
    email: z.string().email({ message: "Chưa đúng định dạng tài khoản email" }),
    content: z.string().min(20, { message: "Nội dung không được ít hơn 20 ký tự" }).max(1000, { message: "Nội dung không quá 1000 ký tự" }),
    subject: z.string()
},)

const BugReportForm = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            content: "",
            subject: "[Báo lỗi] - Có lỗi phát sinh trong hệ thống Oupia."
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        console.log(values);
        toast.success("Gửi thành công.");
        form.reset();
        setIsSubmitting(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="styled-form">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tài khoản email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="email"
                                    disabled={isSubmitting} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Đã có lỗi gì trong quá trình sử dụng Oupia?</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="dark:bg-oupia-sub"
                                    rows={5}
                                    {...field}
                                    disabled={isSubmitting} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="pt-2">
                    <>
                        {isSubmitting ?
                            <Button className="styled-button gap-3" disabled>
                                <Loader size={4} />
                                <span>Đang xử lý</span>
                            </Button> :
                            <Button className="styled-button" type="submit">Gửi thông tin</Button>
                        }
                    </>
                </div>
            </form>
        </Form>
    );
};

export default BugReportForm;
