"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMessageContext } from '@/contexts/message-context';
import { cn } from '@/lib/utils';
import { ImageIcon, SendHorizonal } from 'lucide-react';
import React from 'react';

const ChatInput = () => {

    const { expanded } = useMessageContext();

    return (
        <div className={`${expanded ? "rounded-b-xl" : "rounded-bl-xl"} bg-background p-5 dark:bg-slate-900 absolute bottom-0 w-full`}>
            <div className="w-full border-t dark:border h-full flex flex-col gap-2">
                <div className="flex gap-2">
                    <ImageIcon className="w-6 h-6" />
                </div>
                <div className="flex gap-2">
                    <Input className="dark:bg-slate-800" />
                    <Button className="styled-button gap-2 px-2.5 items-center">
                        <SendHorizonal size="20" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;