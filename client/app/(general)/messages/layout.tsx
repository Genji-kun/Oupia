import { Separator } from "@/components/ui/separator"
import UsersList from "./_components/users-list"


export default function DashboardLayout(
    { children }: { children: React.ReactNode }
) {

    return (
        <div className="h-[calc(100vh-80px)] flex items-center">
            <UsersList />
            <Separator orientation="vertical" className="h-full" />
            {children}
        </div >
    )
}
