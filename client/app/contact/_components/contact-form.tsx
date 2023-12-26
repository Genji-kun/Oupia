import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

import React from 'react';

const ContactForm = () => {
    return (
        <Tabs defaultValue="contact" className="flex flex-col gap-5 w-96">
            <TabsList className="grid w-full grid-cols-2 h-fit border-card border">
                <TabsTrigger value="contact" className="text-base p-2">Liên hệ</TabsTrigger>
                <TabsTrigger value="report" className="text-base p-2">Báo cáo lỗi</TabsTrigger>
            </TabsList>
            <TabsContent value="contact">
                <Card>
                    <CardHeader>
                        <CardTitle>Liên hệ trao đổi</CardTitle>
                        <CardDescription>
                            Bạn hãy cung cấp thông tin dịch vụ bạn cần trao đổi.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="email">Tài khoản email</Label>
                            <Input id="email" type="email" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="bug-detail">Bạn cần hỗ trợ việc gì?</Label>
                            <Textarea id="bug-detail" rows={5} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="styled-button">Gửi thông tin</Button>
                    </CardFooter>
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
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="email">Tài khoản email</Label>
                            <Input id="email" type="email" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="bug-detail">Nội dung</Label>
                            <Textarea id="bug-detail" rows={5} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="styled-button">Gửi thông tin</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    );
};

export default ContactForm;
