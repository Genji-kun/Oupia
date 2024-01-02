import { Metadata } from "next"
import UserProfile from "./_components/user-profile"

export const metadata: Metadata = {
    title: 'Võ Phú Phát',
    description: '',
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {

    return (
        <div>
            <div className="">
                <UserProfile></UserProfile>
            </div>
            <main className="containter">
                {children}
            </main>
        </div>

    )
}
