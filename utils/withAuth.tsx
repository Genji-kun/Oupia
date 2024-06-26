"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import Cookies from "js-cookie"
import React, { FC, PropsWithChildren } from 'react';

type IWithAuthProps = PropsWithChildren<{
  children: React.ReactNode
}>;

const WithAuth: FC<IWithAuthProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!Cookies.get("accessToken")) {
      router.push(pathname === "/sign-in" ? '/sign-in' : '/sign-up')
    } else if (pathname === "/sign-in" || pathname === "/sign-up") {
      router.push("/");
    }
  }, [])

  return <>
    {children}
  </>;
};

export default WithAuth;
