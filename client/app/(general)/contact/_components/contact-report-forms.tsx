"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bug, Phone } from "lucide-react"
import ContactForm from "./contact-form"
import BugReportForm from "./bug-report-form"
import { motion } from "framer-motion"


const ContactReportForms = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="flex justify-center w-full">
            <Tabs defaultValue="contact" className="flex flex-col gap-2 lg:gap-4 w-full">
                <TabsList className="grid w-full grid-cols-2 h-fit border-card border">
                    <TabsTrigger value="contact">
                        <div className="md:text-base p-1  flex items-center gap-x-2">
                            <Phone size={18} />
                            <span>Liên hệ trao đổi</span>
                        </div>
                    </TabsTrigger>
                    <TabsTrigger value="report">
                        <div className="md:text-base p-1  flex items-center gap-x-2">
                            <Bug size={18} />
                            <span>Báo cáo lỗi</span>
                        </div>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="contact">
                    <Card>
                        <CardHeader>
                            <CardTitle>Liên hệ trao đổi</CardTitle>
                            <CardDescription>
                                Bạn hãy cung cấp thông tin dịch vụ bạn cần trao đổi.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ContactForm />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="report">
                    <Card>
                        <CardHeader>
                            <CardTitle>Báo cáo lỗi</CardTitle>
                            <CardDescription>
                                Bạn hãy cung cấp thông tin về lỗi bạn gặp phải khi sử dụng dịch vụ.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <BugReportForm />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </motion.div>
    );
};

export default ContactReportForms;