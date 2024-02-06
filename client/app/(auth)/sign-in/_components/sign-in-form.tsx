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
import { LogIn } from "lucide-react"
import { useState } from "react"
import ForgetPasswordButton from "./forget-password-button"
import Loader from "@/components/ui/loader"

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
                                <Input {...field} disabled={isSubmiting} className="text-base py-6 dark:bg-border/50" />
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
                                <Input type="password" {...field} disabled={isSubmiting} className="text-base py-6 dark:bg-border/50" togglePassword={true} disableToggle={isSubmiting} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <ForgetPasswordButton />
                {isSubmiting ? <>
                    <Button disabled type="submit" className=" mt-6 w-full xl:w-1/2 mx-auto styled-button border p-6 flex gap-3">
                        <span className="text-base">Đang xử lý</span>
                        <Loader size={5} />
                    </Button>
                </> : <>
                    <Button type="submit" className=" mt-6 w-full xl:w-1/2 mx-auto styled-button p-6 flex gap-2 ">
                        <span className="text-normal xl:text-base">Đăng nhập</span>
                        <LogIn size="24" />
                    </Button>
                </>}

            </form>
        </Form>
    )
}

export default SignInForm;