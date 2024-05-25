import { Metadata } from "next"
import UserProfile from "./_components/user-profile"
import { ProfileProvider } from "@/contexts/profile-context"
import dynamic from "next/dynamic"

export const metadata: Metadata = {
    title: 'Oupia',
    description: '',
}

function ProfileLayout({ children }: { children: React.ReactNode }) {

    return (
        <ProfileProvider>
            <div className="bg-background min-h-screen">
                <UserProfile />
                <main className="pt-4">
                    {children}
                </main>
            </div >
        </ProfileProvider>

    )
}

export default dynamic(() => Promise.resolve(ProfileLayout), { ssr: false })

