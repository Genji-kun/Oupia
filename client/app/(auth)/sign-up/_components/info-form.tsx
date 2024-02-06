"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import * as z from "zod"

import { Button } from '@/components/ui/button';
import { CalendarIcon, ChevronLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthTabContext } from "@/contexts/auth-tab-context";
import Loader from "@/components/ui/loader";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const formSchema = z.object({
    fullName: z.string().min(4,
        { message: "Vui lòng điền họ tên người dùng" }
    ),
    phoneNumber: z.string().min(10,
        { message: "Vui lòng điền số điện thoại" }
    ),
    email: z.string().min(1, {
        message: "Vui lòng điền email người dùng"
    }).email({
        message: "Không đúng định dạng email",
    }),
    gender: z.enum(["MALE", "FEMALE", "ORTHER"], {
        required_error: "Vui lòng chọn thông tin"
    }),
    dob: z.date({
        required_error: "Chưa chọn ngày sinh",
    }),
})

const InfoForm = () => {
    const { setTab } = useAuthTabContext();
    const [isSubmiting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: localStorage.getItem('fullName') || "",
            phoneNumber: localStorage.getItem('phoneNumber') || "",
            email: localStorage.getItem('email') || "",
            gender: localStorage.getItem('gender') as "MALE" | "FEMALE" | "ORTHER" || undefined,
            dob: localStorage.getItem('dob') ? new Date(localStorage.getItem('dob')!) : undefined,
        },
    })

    useEffect(() => {
        const subscription = form.watch((values: any) => {
            for (const key in values) {
                if (values[key]) {
                    localStorage.setItem(key, values[key]);
                }
            }
        });

        return () => {
            subscription.unsubscribe();
            for (const key in form.getValues()) {
                localStorage.removeItem(key);
            }
        };
    }, [form]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        console.log(values);
        // Kiểm tra email đã tồn tại chưa
        setTab("user")

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel className="text-base font-semibold text-foreground">Họ tên người dùng</FormLabel>
                            <FormControl>
                                <Input {...field} type="text" disabled={isSubmiting} className="text-base  dark:bg-border/50" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel className="text-base font-semibold text-foreground">Giới tính</FormLabel>
                                <Select disabled={isSubmiting} onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="">
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="MALE">Nam</SelectItem>
                                        <SelectItem value="FEMALE">Nữ</SelectItem>
                                        <SelectItem value="ORTHER">Khác</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel className="text-base font-semibold text-foreground">Ngày sinh</FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full text-left font-normal ",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                    disabled={isSubmiting}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP", { locale: vi })
                                                    ) : (
                                                        <span>Chọn ngày sinh</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                locale={vi}
                                                mode="single"
                                                captionLayout="dropdown-buttons"
                                                fromYear={1960}
                                                toYear={2030}
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel className="text-base font-semibold text-foreground">Tài khoản email</FormLabel>
                            <FormControl>
                                <Input {...field} type="email" disabled={isSubmiting} className="text-base dark:bg-border/50" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base font-semibold text-foreground">Số điện thoại</FormLabel>
                            <FormControl>
                                <Input {...field} type="phone" disabled={isSubmiting} className="text-base  dark:bg-border/50" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {isSubmiting ? <>
                    <Button disabled className=" ml-auto w-fit styled-button border-gray-200 border flex gap-3 ">
                        <span className="text-base">Đang xử lý</span>
                        <Loader size={4} />
                    </Button>
                </> : <>
                    <div className="w-fit flex gap-x-2 items-center ml-auto pt-2">
                        <Button type="button" variant="ghost" className="flex items-center gap-x-1 w-fit p-4" onClick={() => setTab("sign-up")}>
                            <ChevronLeft size="20" />
                            <span className="font-semibold text-base">Quay lại</span>
                        </Button>
                        <Button type="submit" className=" w-fit styled-button border-gray-200 border flex gap-2 px-6 py-4">
                            <span className="text-base">Tỉếp tục</span>
                        </Button>
                    </div>
                </>}

            </form>
        </Form>
    )
}

export default InfoForm;