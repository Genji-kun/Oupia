import { HiOutlineHomeModern } from "react-icons/hi2";
import { MdOutlineScreenshotMonitor } from "react-icons/md";

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
        name: "Xác thực",
        href: "/vote"
    }, {
        name: "Liên hệ",
        href: "/contact"
    }
];

export const settingsRoutes = [
    {
        name: "Tài khoản chủ trọ",
        href: "/settings/landlord",
    },
    {
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
        name: "Màn hình",
        href: "/settings/appearance",
        icon: MdOutlineScreenshotMonitor
    }
];
