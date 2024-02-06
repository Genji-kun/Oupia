import { Input } from '@/components/ui/input';
import { Camera } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

const UserForm = () => {

    const [avatar, setAvatar] = useState("");

    const handleFileChange = (evt: any) => {
        if (evt.target.files && evt.target.files[0]) {
            const file = evt.target.files[0];
            const fileURL = URL.createObjectURL(file);
            setAvatar(fileURL);
        }
    };

    return (
        <div>
            <div className="w-40 h-40 ring-4 ring-border rounded-full mx-auto relative">
                <Image
                    src={avatar ? avatar : 'https://pixlok.com/wp-content/uploads/2021/03/default-user-profile-picture.jpg'}
                    alt="Avatar"
                    height={300}
                    width={300}
                    className="w-full h-full rounded-full object-cover"
                />
                <label htmlFor="avatar" className="absolute inset-0 flex items-center justify-center rounded-full cursor-pointer hover:bg-gradient-to-t from-zinc-900/75 to-zinc-800/0">
                    <div className="flex flex-col gap-2 w-full items-center text-white">
                        <Camera size={30}></Camera>
                        <span className="font-semibold">Thay đổi ảnh</span>
                    </div>
                    <div className="hidden" >
                        <Input id="avatar" type="file" accept='image/*' onChange={(evt) => handleFileChange(evt)} />
                    </div>
                </label>
            </div>
        </div>
    );
};

export default UserForm;