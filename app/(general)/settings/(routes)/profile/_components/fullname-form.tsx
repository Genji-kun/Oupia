"use client";

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
    fullName: z.string().min(5, { message: "Họ tên không được nhỏ hơn 5 ký tự" }).max(50, { message: "Họ tên không quá 50 ký tự" }),
},)


const FullNameForm = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditting, setIsEditting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="styled-form">
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">Họ tên người dùng</FormLabel>
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
                    </div> : <Button onClick={() => setIsEditting(true)} type="button" className="styled-button ">
                        Chỉnh sửa
                    </Button>
                }


            </form>
        </Form>
    );
};

export default FullNameForm;