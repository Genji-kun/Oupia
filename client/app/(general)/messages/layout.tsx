import UsersList from "./_components/users-list"
import { MessageProvider } from "@/contexts/message-context"


export default function DashboardLayout(
    { children }: { children: React.ReactNode }
) {

    return (
        <MessageProvider>
            <div className="h-[calc(100vh-80px)] flex items-center">
                <div className="p-8 h-full w-1/4">
                    <UsersList />
                </div>
                <div className="p-8 w-full h-full pl-0">
                    {children}
                </div>
            </div >
        </MessageProvider>
    )
}
