import NavbarLogo from '@/components/ui/navbar/navbar-logo';
import { Separator } from '@/components/ui/separator';
import React from 'react';

const ContactInfo = () => {
    return (
        <div className="flex flex-col gap-5 justify-start py-2">
            <div className="w-fit">
                <NavbarLogo />
            </div>
            <Separator />
            <blockquote className="text-lg md:text-xl italic font-bold text-gray-700 dark:text-gray-400">
                <p>&quot;Sự đóng góp của bạn sẽ tạo động lực giúp hệ thống Oupia ngày càng phát triển, hoàn thiện hơn trong tương lai.&quot;</p>
            </blockquote>
            <Separator />
            <div>
                <h1 className="text-gray-500 dark:text-gray-400">Địa chỉ làm việc</h1>
                <span>371 Nguyễn Kiệm, phường 5, quận Gò Vấp, thành phố Hồ Chí Minh</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <h1 className="text-gray-500 dark:text-gray-400">Số điện thoại</h1>
                    <span>(+84) 910315514</span>
                </div>
                <div>
                    <h1 className="text-gray-500 dark:text-gray-400">Email liên hệ</h1>
                    <span>2051052097phat@ou.edu.vn</span>
                </div>
            </div>
            <Separator />
        </div>
    );
};

export default ContactInfo;