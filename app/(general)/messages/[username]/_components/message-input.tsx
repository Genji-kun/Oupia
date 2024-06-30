"use client"

import { useMessageContext } from '@/contexts/message-context';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ImageIcon, Link, Smile, StickyNote, X } from 'lucide-react';
import { HiOutlineHomeModern } from "react-icons/hi2";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { useTheme } from 'next-themes';

import { DocumentData, addDoc, collection, getDocs, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { db, storage } from '@/configs/firebase';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useMessageToUserContext } from '@/contexts/message-to-user-context';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const MessageInput: React.FC = () => {

    const { currentUser } = useSelector((state: any) => state.currentUserSlice);
    const router = useRouter();

    const { userInfoData, setMessages, expanded } = useMessageContext();
    const { imageFiles, setImageFiles } = useMessageToUserContext();
    const { theme } = useTheme();

    const [message, setMessage] = useState('');

    const handleEmojiSelect = (emoji: any) => {
        setMessage(prevMessage => prevMessage + emoji.native);
    }

    const handleFileChange = (evt: any) => {
        const newFiles = Array.prototype.slice.call(evt.target.files);
        setImageFiles((current: any) => [...(current || []), ...newFiles]);
    }

    const handleDelete = (file: File) => {
        setImageFiles((images: File[]) => images.filter((f) => f !== file));
    }

    const uploadImage = async (imgFile: File) => {
        const imagePath = `images/${Date.now()}-${currentUser?.username}-${imgFile.name}`;
        const storageRef = ref(storage, imagePath);
        await uploadBytes(storageRef, imgFile);
        const url = await getDownloadURL(storageRef);
        return url;
    }

    const sendMessage = async (evt: any) => {
        evt.preventDefault();

        if (message.trim().length > 0 || imageFiles.length > 0) {

            const nameArr = currentUser.fullName.split(" ");
            const chatroomsRef = collection(db, 'chatrooms');
            const combinedUsername = [currentUser.username, userInfoData.username].sort().join(':');
            const q = query(chatroomsRef, where('roomId', '==', combinedUsername));
            getDocs(q).then(async (snapshot: any) => {
                const chatroom = snapshot.docs[0];
                const newMessage: any = {
                    sender: currentUser?.username,
                    content: message,
                    createdAt: serverTimestamp(),
                    firstName: nameArr[nameArr.length - 1]
                }
                if (message.trim().length > 0) {
                    newMessage.type = "text";
                    newMessage.content = message.trim();
                } else if (imageFiles.length > 0) {
                    newMessage.type = "image";
                    newMessage.images = [];
                    const uploadPromises = imageFiles.map(imgFile => uploadImage(imgFile));
                    const imageUrls = await Promise.all(uploadPromises);
                    newMessage.images = imageUrls;
                }
                if (chatroom) {
                    addDoc(collection(chatroom.ref, 'messages'), {
                        ...newMessage
                    }).then(() => {
                        updateDoc(chatroom.ref, {
                            lastMessage: newMessage,
                            updatedAt: serverTimestamp(),
                        });
                    });
                } else {
                    addDoc(chatroomsRef, {
                        roomId: combinedUsername,
                        members: [currentUser?.username, userInfoData.username],
                        user1: currentUser,
                        user2: userInfoData
                    }).then((chatroomsRef) => {
                        updateMessage();
                        addDoc(collection(chatroomsRef, 'messages'), {
                            ...newMessage
                        }).then(() => {
                            updateDoc(chatroomsRef, {
                                lastMessage: newMessage,
                                updatedAt: serverTimestamp(),
                            });
                        });
                    });
                }
            })
            setMessage('');
            setImageFiles([]);
        }
    }

    const updateMessage = () => {
        if (currentUser) {
            const chatroomsRef = collection(db, 'chatrooms');
            const combinedUsername = [currentUser.username, userInfoData.username].sort().join(':');
            const q = query(chatroomsRef, where('roomId', '==', combinedUsername));
            getDocs(q).then((snapshot) => {
                const chatroom = snapshot.docs[0];
                if (chatroom) {
                    const messageRef = collection(chatroom.ref, "messages");
                    const q2 = query(messageRef, orderBy("createdAt"));
                    onSnapshot(q2, (snapshot: any) => {
                        setMessages(snapshot.docs.map((doc: DocumentData) => doc.data()));
                    })
                }
            });
        }
    }

    if (!currentUser) {
        return <>{router.push("/sign-in")}</>
    }


    return (
        <>
            <div className={cn("w-full", imageFiles.length > 0 && "flex flex-col gap-2 border-t")}>
                {imageFiles.length !== 0 && (
                    <div className="flex flex-wrap gap-2 items-center p-4 pb-0">
                        {imageFiles.map((image, index) => (
                            <div key={index} className="col-span-1 relative">
                                <X className="text-destructive font-bold w-6 h-6 p-1 bg-background hover:bg-border dark:hover:bg-oupia-sub dark:bg-oupia-base rounded-full absolute -right-2 -top-2 cursor-pointer"
                                    onClick={() => handleDelete(image)}
                                />
                                <Image width={500} height={500} className="rounded-lg object-cover w-16 aspect-square" src={URL.createObjectURL(image)} alt={image.name} />
                            </div>
                        ))}
                    </div>)}
                <div className={cn("bg-background dark:bg-oupia-base w-full", expanded ? "rounded-b-xl" : "rounded-bl-xl")}>
                    <div className="flex gap-2 items-center p-4">
                        <Popover>
                            <PopoverTrigger>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button variant={"ghost"} className="items-center rounded-full p-2 h-fit text-muted-foreground">
                                                <BiSolidMessageSquareAdd className="w-6 h-6" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent align='start' className="mb-0.5">
                                            <p>Thêm một đính kèm</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </PopoverTrigger>
                            <PopoverContent side='top' align='start' className="mb-1 flex flex-col p-2 w-[200px]">
                                <label
                                    htmlFor="photos"
                                    className='w-full'>
                                    <div className="flex gap-x-2 items-center text-sm hover:bg-accent p-2 cursor-pointer rounded w-full">
                                        <ImageIcon className="w-4 h-4" />
                                        <span>Hình ảnh</span>
                                    </div>
                                    <Input
                                        id="photos"
                                        name="photos"
                                        type="file"
                                        multiple
                                        className="sr-only"
                                        accept="image/png, image/jpeg"
                                        onChange={handleFileChange}
                                    />
                                </label>
                            </PopoverContent>
                        </Popover>
                        <div className="relative w-full">
                            <form className="flex gap-2 flex-grow" onSubmit={(e) => { sendMessage(e) }}>
                                <Input
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    placeholder='Nhập nội dung tin nhắn...'
                                    className="dark:bg-oupia-sub dark:border-none enabled:focus:ring-0 p-4 pr-10 " />
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button type="submit" className="styled-button px-3 items-center ">
                                                <svg className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24">
                                                    <path d="M23.119.882a2.966,2.966,0,0,0-2.8-.8l-16,3.37a4.995,4.995,0,0,0-2.853,8.481L3.184,13.65a1,1,0,0,1,.293.708v3.168a2.965,2.965,0,0,0,.3,1.285l-.008.007.026.026A3,3,0,0,0,5.157,20.2l.026.026.007-.008a2.965,2.965,0,0,0,1.285.3H9.643a1,1,0,0,1,.707.292l1.717,1.717A4.963,4.963,0,0,0,15.587,24a5.049,5.049,0,0,0,1.605-.264,4.933,4.933,0,0,0,3.344-3.986L23.911,3.715A2.975,2.975,0,0,0,23.119.882ZM4.6,12.238,2.881,10.521a2.94,2.94,0,0,1-.722-3.074,2.978,2.978,0,0,1,2.5-2.026L20.5,2.086,5.475,17.113V14.358A2.978,2.978,0,0,0,4.6,12.238Zm13.971,7.17a3,3,0,0,1-5.089,1.712L11.762,19.4a2.978,2.978,0,0,0-2.119-.878H6.888L21.915,3.5Z" />
                                                </svg>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent align='end' className="mb-0.5">
                                            <p>Gửi tin nhắn</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </form>
                            <Popover>
                                <PopoverTrigger className="absolute right-[3.25rem] top-1/2 -translate-y-1/2">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger >
                                                <Button type="button" variant={"ghost"} className="rounded-full p-2 h-fit text-foreground bg-background dark:bg-oupia-sub">
                                                    <Smile className="w-5 h-5" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent align='end' className="mb-0.5">
                                                <p>Chọn biểu tượng cảm xúc</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </PopoverTrigger>
                                <PopoverContent side='top' align='end' className="mb-1 p-0 border-none shadow-none relative">
                                    <div className="shadow-lg w-fit rounded-xl absolute right-0 bottom-0" >
                                        <Picker data={data} theme={theme && theme} onEmojiSelect={handleEmojiSelect} />
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default MessageInput;