import { Metadata } from "next"
import UsersList from "./_components/users-list"
import { MessageProvider } from "@/contexts/message-context"
import { MessageSearchProvider } from "@/contexts/message-search-context"
import WithAuth from "@/utils/withAuth"
import Hydration from "@/components/shared/Hydration"

export const metadata: Metadata = {
    title: 'Nhắn tin',
}

export default function MessageLayout(
    { children }: { children: React.ReactNode }
) {
    return (
        <WithAuth>
            <Hydration>
                <MessageProvider>
                    <div className="min-h-[clac(100vh-80px)] lg:min-h-fit lg:h-[calc(100vh-80px)] flex items-center">
                        <MessageSearchProvider>
                            <div className="p-4 xl:p-8 h-full w-[30%]">
                                <UsersList />
                            </div>
                        </MessageSearchProvider>
                        <div className="w-full h-full p-4 pl-0 xl:p-8 xl:pl-0 min-h-[clac(100vh-80px)] lg:min-h-fit">
                            {children}
                        </div>
                    </div >
                </MessageProvider>
            </Hydration>
        </WithAuth>
    )
}
