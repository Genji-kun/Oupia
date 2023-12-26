import React from 'react';
import ContactTitle from './_components/contact-title';
import ContactForm from './_components/contact-form';
import NavbarLogo from '@/components/ui/navbar/navbar-logo';
import { Separator } from '@/components/ui/separator';

const ContactPage = () => {
    return (
        <div className="container h-full flex flex-col gap-y-16 min-h-screen py-6">
            <ContactTitle />
            <div className="grid grid-cols-2">
                <div className="flex justify-center w-full">
                    <ContactForm />
                </div>
                <div className="flex flex-col gap-5 justify-start">
                    <NavbarLogo />
                    <Separator />
                    <blockquote className="text-xl italic font-bold text-gray-700 dark:text-gray-400">
                        <p>&quot;Sự đóng góp của bạn sẽ giúp tạo động lực giúp hệ thống Oupia ngày càng phát triển, hoàn thiện hơn trong tương lai.&quot;</p>
                    </blockquote>
                    <Separator />
                    <div>
                        <h1 className="text-gray-700 dark:text-gray-400">Địa chỉ làm việc</h1>
                        <span>371 Nguyễn Kiệm, phường 5, quận Gò Vấp, thành phố Hồ Chí Minh</span>
                    </div>
                    <div>
                        <h1 className="text-gray-700 dark:text-gray-400">Số điện thoại</h1>
                        <span>(+84) 910315514</span>
                    </div>
                    <div>
                        <h1 className="text-gray-700 dark:text-gray-400">Email</h1>
                        <span>oupia@gmail.com</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;