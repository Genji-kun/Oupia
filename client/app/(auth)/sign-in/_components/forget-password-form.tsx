"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import * as z from "zod"

import { Button } from '@/components/ui/button';
import { ChevronLeft, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthTabContext } from "@/contexts/auth-tab-context";

const formSchema = z.object({
    email: z.string().email({
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
                    <Button disabled type="submit" className=" ml-auto w-fit styled-button border-gray-200 border flex gap-2 ">
                        <Loader2 size="24" className="h-4 w-4 animate-spin" />
                        <span className="text-base">Đang xử lý</span>
                    </Button>
                </> : <>
                    <div className="w-fit flex gap-x-2 items-center ml-auto">
                        <Button type="button" variant="ghost" className="flex items-center gap-x-1 w-fit" onClick={() => setTab("sign-in")}>
                            <ChevronLeft size="20" />
                            <span className="font-semibold text-base">Quay lại</span>
                        </Button>
                        <Button type="submit" className=" w-fit styled-button border-gray-200 border flex gap-2 bg-primary-500 hover:bg-gradient-to-r from-primary-500 to-primary-700">
                            <span className="text-base">Gửi mã xác nhận</span>
                        </Button>
                    </div>
                </>}

            </form>
        </Form>
    )
}

export default ForgetPasswordForm;