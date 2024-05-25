import { Contact2, KeyIcon, UserRoundIcon } from "lucide-react";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { MdOutlineScreenshotMonitor } from "react-icons/md";
import { TbBellRinging2 } from "react-icons/tb";

export const navRoutes = [
    {
        name: "Trang chủ",
        href: "/"
    }, {
        name: "Tìm thuê",
        href: "/find"
    }, {
        name: "Diễn đàn",
        href: "/forum"
    }, {
        name: "Liên hệ",
        href: "/contact"
    }
];

export const settingsRoutes = [
    {
        name: "Tài khoản Chủ nhà trọ",
        href: "/settings/landlord",
    },
    {
        name: "Thông tin cá nhân",
        href: "/settings/profile",
    }, {
        name: "Tài khoản",
        href: "/settings/account",
    }, {
        name: "Thông báo",
        href: "/settings/notifications",
    }, {
        name: "Mật khẩu",
        href: "/settings/password",
    }, {
        name: "Màn hình giao diện",
        href: "/settings/appearance",
    }
];


export const mobileSettingsRoutes: { name: string, href: string, icon: any }[] = [
    {
        name: "Nâng cấp",
        href: "/settings/landlord",
        icon: HiOutlineHomeModern
    },
    {
        name: "Thông tin",
        href: "/settings/profile",
        icon: Contact2
    }, {
        name: "Tài khoản",
        href: "/settings/account",
        icon: UserRoundIcon
    }, {
        name: "Thông báo",
        href: "/settings/notifications",
        icon: TbBellRinging2
    }, {
        name: "Mật khẩu",
        href: "/settings/password",
        icon: KeyIcon
    }, {
        name: "Màn hình",
        href: "/settings/appearance",
        icon: MdOutlineScreenshotMonitor
    }
];
