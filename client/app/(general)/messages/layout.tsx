import UsersList from "./_components/users-list"
import { MessageProvider } from "@/contexts/message-context"


export default function DashboardLayout(
    { children }: { children: React.ReactNode }
) {

    return (
        <MessageProvider>
            <div className="min-h-[clac(100vh-80px)] lg:min-h-fit lg:h-[calc(100vh-80px)] flex items-center">
                <div className="p-4 xl:p-8 h-full w-fit xl:w-1/4">
                    <UsersList />
                </div>
                <div className="w-full h-full p-4 pl-0 xl:p-8 xl:pl-0 min-h-[clac(100vh-80px)] lg:min-h-fit">
                    {children}
                </div>
            </div >
        </MessageProvider>
    )
}
