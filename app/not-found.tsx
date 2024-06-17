import { Button } from '@/components/ui/button'
import { Metadata, NextPage } from 'next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { IoHome } from 'react-icons/io5'

export const metadata: Metadata = {
    title: "Không tìm thấy trang",
    description: "Đường dẫn bạn truy cập không tồn tại, vui lòng về trang chủ."
}

const NotFound: NextPage = () => {

    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <div className="relative w-1/2">
                <Image width={500} height={500} className="w-full" src="https://res.cloudinary.com/dzba4fewa/image/upload/v1713517776/404-ezgif.com-gif-maker_xg47hx.gif" alt='404 Not Found' />
                <h1 className="w-full text-center text-5xl text-primary font-bold absolute bottom-24 inset-x-0">404 Not Found</h1>
            </div>
            <div className="flex flex-col gap-8 items-center -translate-y-20">
                <p className="text-xl italic text-muted-foreground">Đường dẫn bạn truy cập không tồn tại, hãy quay về trang chủ.</p>
                <Link href="/">
                    <Button className="styled-button">
                        <IoHome className="mr-2 h-5 w-5" />
                        <span className="font-semibold">Về trang chủ</span>
                    </Button>
                </Link>
            </div>
        </div >
    )
}

export default dynamic(() => Promise.resolve(NotFound), { ssr: false })