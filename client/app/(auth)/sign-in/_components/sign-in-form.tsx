"use client"

import { cookies } from "next/headers"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LogIn } from "lucide-react"
import { useState } from "react"
import ForgetPasswordButton from "./forget-password-button"
import Loader from "@/components/ui/loader"
import { authApi, publicApi } from "@/configs/axiosInstance"
import { authEndpoints } from "@/configs/axiosEndpoints"
import { useDispatch } from "react-redux"
import { login } from "@/redux/slices/currentUserSlice"
import { redirect } from "next/navigation"

const formSchema = z.object({
    username: z.string({ "required_error": "Tên người dùng không được để trống" }),
    password: z.string({ "required_error": "Mật khẩu không được để trống" })
})

const SignInForm = () => {

    const [isSubmiting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            const res = await publicApi.post(authEndpoints['sign-in'], values);
            if (res.status === 200) {
                const cookieStore = cookies();
                cookieStore.set("accessToken", res.data.accessToken);
                let { data } = await authApi.get(authEndpoints["current-user"]);
                cookieStore.set("user", data);
                dispatch(login(data));
                redirect("/");
            }
        } catch (error) {
            console.error(error);
        }
        setIsSubmitting(false);
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
                                <Input {...field} disabled={isSubmiting} className="text-base py-6 dark:bg-oupia-sub" />
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
                                <Input type="password" {...field} disabled={isSubmiting} className="text-base py-6 dark:bg-oupia-sub" togglePassword={true} disableToggle={isSubmiting} />
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