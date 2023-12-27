"use client";

import React from 'react';
import ContactTitle from './_components/contact-title';
import { motion } from "framer-motion";
import ContactInfo from './_components/contact-info';
import ContactReportForms from './_components/contact-report-forms';

const ContactPage = () => {
    return (
        <div className="container w-full h-full flex flex-col gap-y-8 min-h-screen py-6 lg:py-8 px-5 lg:px-0">
            <ContactTitle />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, type: "spring" }}
                    className="flex justify-center w-full">
                    <ContactReportForms />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, type: "spring" }}>
                    <ContactInfo></ContactInfo>
                </motion.div>
            </div>
        </div >
    );
};

export default ContactPage;