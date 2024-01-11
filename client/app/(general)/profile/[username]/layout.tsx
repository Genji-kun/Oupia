import { Metadata } from "next"
import UserProfile from "./_components/user-profile"

export const metadata: Metadata = {
    title: 'Võ Phú Phát | Oupia',
    description: '',
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="containter">
            <UserProfile />
            <main className="pt-4">
                {children}
            </main>
        </div >

    )
}
