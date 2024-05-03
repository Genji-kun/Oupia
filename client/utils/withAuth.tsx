"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import cookies from "react-cookies"

export default function withAuth(Component: any) {
  return function ProtectedRoute({ ...props }) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (!cookies.load("user")) {
        router.push('/sign-in')
      } else if(pathname === "/sign-in" || pathname === "/sign-up"){
        router.push("/");
      }
    }, [])

    return <Component {...props} />
  }
}
