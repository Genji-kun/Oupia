import Image from 'next/image';
import React from 'react';
import background from "@/public/loginBG.png";
import SignInForm from './sign-in-form';

const SignInPage = () => {
    return (
        <div className="h-screen container grid grid-cols-2">
            <div>
                <Image className="h-full object-cover w-full" src={background} alt="Sign In" />
            </div>
            <div className="h-full w-full flex justify-center items-center ">
                <SignInForm />
            </div>
        </div>
    );
};

export default SignInPage;