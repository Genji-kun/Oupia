"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ChevronLeft } from 'lucide-react';
import React, { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthTabContext } from "@/contexts/auth-tab-context";
import Loader from "@/components/ui/loader";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useSignUpContext } from "@/contexts/sign-up-context";
import { registerInfoSchema } from "@/lib/schemas/UserSchema";
import { IRegisterInfoForm } from "@/lib/interfaces/Register";
import GenderSelect from "./GenderSelect";
import { Gender } from "@/lib/enums";
import { IUserRegister } from "@/lib/interfaces/request/User";

const InfoForm = () => {
    const { setTab } = useAuthTabContext();
    const { user, setUser } = useSignUpContext();
    const [isSubmitting, setIsSubmitting] = useState(false);


    const infoSchema = useForm<IRegisterInfoForm>({
        resolver: zodResolver(registerInfoSchema),
        defaultValues: {
            fullName: user ? user.fullName : "",
            phoneNumber: user ? user.phoneNumber : "",
            email: user ? user.email : "",
            gender: user.gender || Gender.OTHER,
            dob: user ? (typeof user.dob === 'string' ? new Date(user.dob) : user.dob) : new Date(),
        },
    })

    function onSubmit(values: IRegisterInfoForm) {
        setIsSubmitting(true);
        setUser((prev: any) => {
            return { ...prev, ...values, gender: values.gender.toString() as string } as IUserRegister;
        })
        setIsSubmitting(false);
        setTab("user");
    }


    return (
        <Form {...infoSchema}>
            <form onSubmit={infoSchema.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={infoSchema.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel className="text-base font-semibold text-foreground">Họ tên người dùng</FormLabel>
                            <FormControl>
                                <Input {...field} type="text" disabled={isSubmitting} className="text-base dark:bg-oupia-sub" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    <GenderSelect {...{ control: infoSchema.control, name: "gender", isSubmitting: isSubmitting }} />
                    <FormField
                        control={infoSchema.control}
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
                                                        "w-full text-left font-normal dark:bg-oupia-sub",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                    disabled={isSubmitting}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "dd-MM-yyyy")
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
                    control={infoSchema.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel className="text-base font-semibold text-foreground">Tài khoản email</FormLabel>
                            <FormControl>
                                <Input {...field} type="email" disabled={isSubmitting} className="text-basedark:bg-oupia-sub" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={infoSchema.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base font-semibold text-foreground">Số điện thoại</FormLabel>
                            <FormControl>
                                <Input {...field} type="phone" disabled={isSubmitting} className="text-base dark:bg-oupia-sub" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {isSubmitting ? <>
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
                        <Button type="submit" className=" w-fit styled-button flex gap-2 px-6 py-4">
                            <span className="text-base">Tỉếp tục</span>
                        </Button>
                    </div>
                </>}

            </form>
        </Form>
    )
}

export default InfoForm;