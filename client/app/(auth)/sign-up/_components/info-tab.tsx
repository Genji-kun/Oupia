import { Separator } from '@/components/ui/separator';
import React from 'react';
import InfoForm from './info-form';

const InfoTab = () => {
    return (
        <>
            <div>
                <h1 className="font-montserrat font-bold text-3xl lg:text-4xl mb-2 text-center lg:text-left ">Thông tin cá nhân</h1>
                <p className="text-gray-600 dark:text-gray-700 text-center lg:text-left ">Lưu trữ thông tin cơ bản của người dùng và thông tin liên hệ.</p>
            </div>
            <Separator className="lg:w-1/2" />
            <InfoForm />
        </>
    );
};

export default InfoTab;