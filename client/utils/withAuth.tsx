"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import cookies from "react-cookies"

export default function withAuth(Component: React.FC) {
  return function ProtectedRoute({ ...props }) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (!cookies.load("user")) {
        router.push(pathname === "/sign-in" ? '/sign-in' : '/sign-up')
      } else if(pathname === "/sign-in" || pathname === "/sign-up"){
        router.push("/");
      }
    }, [])

    return <Component {...props} />
  }
}
