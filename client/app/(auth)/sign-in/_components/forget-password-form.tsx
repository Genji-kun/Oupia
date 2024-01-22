"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import * as z from "zod"

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import React, { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthTabContext } from "@/contexts/auth-tab-context";
import Loader from "@/components/ui/loader";

const formSchema = z.object({
    email: z.string().min(1, {
        message: "Vui lòng điền email người dùng"
    }).email({
        message: "Không đúng định dạng email",
    }),
})

const ForgetPasswordForm = () => {
    const { setTab } = useAuthTabContext();
    const [isSubmiting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        console.log(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel className="text-base font-semibold text-foreground">Email người dùng</FormLabel>
                            <FormControl>
                                <Input {...field} type="email" disabled={isSubmiting} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {isSubmiting ? <>
                    <Button disabled type="submit" className=" ml-auto w-fit styled-button border-gray-200 border flex gap-3 ">
                        <span className="text-base">Đang xử lý</span>
                        <Loader size={4} />
                    </Button>
                </> : <>
                    <div className="w-fit flex gap-x-2 items-center ml-auto">
                        <Button type="button" variant="ghost" className="flex items-center gap-x-1 w-fit" onClick={() => setTab("sign-in")}>
                            <ChevronLeft size="20" />
                            <span className="font-semibold text-base">Quay lại</span>
                        </Button>
                        <Button type="submit" className=" w-fit styled-button border-gray-200 border flex gap-2 ">
                            <span className="text-base">Gửi mã xác nhận</span>
                        </Button>
                    </div>
                </>}

            </form>
        </Form>
    )
}

export default ForgetPasswordForm;