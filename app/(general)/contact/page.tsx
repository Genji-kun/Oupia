import React from 'react';
import ContactTitle from './_components/contact-title';
import ContactInfo from './_components/contact-info';
import ContactReportForms from './_components/contact-report-forms';

import { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
    title: 'Liên hệ và báo lỗi | Oupia',
    description: '',
}

const ContactPage = () => {
    return (
        <div className="container w-full flex flex-col gap-y-8 xl:gap-y-16 min-h-screen justify-center py-10 xl:-translate-y-12 px-4 lg:px-0">
            <ContactTitle />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 xl:gap-24 xl:px-16">
                <ContactReportForms />
                <ContactInfo />
            </div>
        </div >
    );
};

export default dynamic(() => Promise.resolve(ContactPage), { ssr: false })
