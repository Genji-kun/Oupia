import React from 'react';
import ContactTitle from './_components/contact-title';
import ContactInfo from './_components/contact-info';
import ContactReportForms from './_components/contact-report-forms';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Oupia | Liên hệ và báo lỗi',
    description: '',
}

const ContactPage = () => {
    return (
        <div className="container w-full h-full flex flex-col gap-y-8 xl:gap-y-16 min-h-screen py-6 lg:py-8 xl:py-10 px-4 lg:px-0">
            <ContactTitle />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
                <ContactReportForms />
                <ContactInfo />
            </div>
        </div >
    );
};

export default ContactPage;