"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { toast } from "sonner"
import Loader from "@/components/ui/loader"
import { ChevronLeft } from "lucide-react"
import { useState } from "react"
import { useAuthTabContext } from "@/contexts/auth-tab-context"

const FormSchema = z.object({
    otp: z.string().min(6, {
        message: "Mã OTP không hợp lệ",
    }),
})

export function OtpForm() {

    const {setTab} = useAuthTabContext();
    const [isSubmiting, setIsSubmitting] = useState<boolean>(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            otp: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setTab("new-password");
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base font-semibold text-foreground">Mã OTP</FormLabel>
                            <FormControl>
                                <InputOTP maxLength={6} {...field}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormDescription>
                                Hãy điền mã OTP đã được gửi tới email bạn.
                            </FormDescription>
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
                            <span className="text-base">Gửi mã xác nhận</span>
                        </Button>
                    </div>
                </>}
            </form>
        </Form>
    )
}
