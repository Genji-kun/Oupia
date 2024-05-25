import { Gender } from "@/enums";
import { z } from "zod";

export const registerAccountSchema = z.object({
    avatar: typeof File !== 'undefined' ? z.instanceof(File).optional() : z.any().optional(),
    username: z.string({
    }).min(6, {
        message: "Tên tài khoản cần tối thiểu 6 ký tự"
    }),
    password: z.string({
        required_error: "Mật khẩu không được bỏ trống",
    }).min(8,
        { message: "Mật khẩu cần tối thiểu 8 ký tự" }
    ),
    confirm: z.string({
        required_error: "Mật khẩu xác nhận không được bỏ trống",
    }).min(8,
        { message: "Mật khẩu xác nhận cần tối thiểu 8 ký tự" }
    ),
});

export const registerInfoSchema = z.object({
    fullName: z.string({
        required_error: "Họ tên không được bỏ trống",
    }).min(6,
        { message: "Họ tên cần tối thiểu 6 ký tự" }
    ),
    phoneNumber: z.string({
        required_error: "Số điện thoại không được bỏ trống",
    }).min(10,
        { message: "Số điện thoại cần tối thiểu 10 ký tự" }
    ),
    email: z.string({
        required_error: "Email không được bỏ trống",
    }).email({
        message: "Email không hợp lệ",
    }),
    gender: z.nativeEnum(Gender, {
        required_error: 'Giới tính không được bỏ trống',
        invalid_type_error: 'Giới tính không hợp lệ',
    }),
    dob: z.date({
        required_error: "Ngày sinh không được bỏ trống",
    }),
})