"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2, LogIn } from "lucide-react"
import { useState } from "react"
import ForgetPasswordButton from "./forget-password-button"

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Tên người dùng không được để trống",
    }),
    password: z.string().min(1, {
        message: "Mật khẩu không được để trống"
    })
})

const SignInForm = () => {

    const [isSubmiting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        console.log(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel className="text-base font-semibold text-foreground">Tên nguời dùng</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isSubmiting} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel className="text-base font-semibold text-foreground">Mật khẩu</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} disabled={isSubmiting} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <ForgetPasswordButton />
                {isSubmiting ? <>
                    <Button disabled type="submit" className=" mt-6 w-full styled-button border-gray-200 border flex gap-2 ">
                        <Loader2 size="24" className="mr-2 h-4 w-4 animate-spin" />
                    </Button>
                </> : <>
                    <Button type="submit" className=" mt-6 w-full styled-button border-gray-200 border flex gap-2 ">
                        <span className="text-base">Đăng nhập</span>
                        <LogIn size="24" />
                    </Button>
                </>}

            </form>
        </Form>
    )
}

export default SignInForm;