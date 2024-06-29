"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2, LogIn } from "lucide-react"
import { useState } from "react"
import ForgetPasswordButton from "./forget-password-button"
import { toast } from "sonner";
import { loginSchema } from "@/lib/schemas/UserSchema";
import { IUserLogin } from "@/lib/interfaces";
import { useLogin } from "@/hooks/mutation";

const SignInForm = () => {

    const loginForm = useForm<IUserLogin>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const { mutateLogin, isPendingLogin } = useLogin();

    async function onSubmit(values: IUserLogin) {
        await mutateLogin(values).catch(() => {
            toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
            return;
        });
    }

    return (
        <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={loginForm.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel className="text-base font-semibold text-foreground">Tên nguời dùng</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isPendingLogin} className="text-base py-6 dark:bg-oupia-sub" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel className="text-base font-semibold text-foreground">Mật khẩu</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} disabled={isPendingLogin} className="text-base py-6 dark:bg-oupia-sub" togglePassword={true} disableToggle={isPendingLogin} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <ForgetPasswordButton />
                {isPendingLogin ? <>
                    <Button disabled type="submit" className=" mt-6 w-full xl:w-1/2 mx-auto styled-button border p-6 flex gap-3">
                        <span className="text-base">Đang xử lý</span>
                        <Loader2 size="22" className="animate-spin" />
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