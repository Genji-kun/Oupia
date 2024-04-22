import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Follower } from '@/interfaces/User'
import { convert } from '@/utils/convertAvatarAlt'
import { UserRoundSearchIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { HiOutlineHomeModern } from 'react-icons/hi2'

function FollowerItem({ user }: { user: Follower }) {
    return (
        <Link href={`/profile/${user.username}/`} className='flex gap-5 rounded-lg items-center p-2 w-full hover:bg-accent dark:hover:bg-oupia-base'>
            <Avatar className='w-36 h-36 rounded-lg'>
                <AvatarImage src={user.avatar} alt={user.fullName} className="w-full h-full" />
                <AvatarFallback className="text-3xl font-semibold rounded-lg">{user.fullName && convert(user.fullName)}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
                <h3 className="font-bold text-2xl">{user.fullName}</h3>
                {(() => {
                    switch (user.role) {
                        case "ROLE_TENANT":
                            return <div className="flex items-center gap-1.5 text-muted-foreground">
                                <UserRoundSearchIcon className="w-4 h-4" />
                                <span>Ngươời tim trọ</span>
                            </div>
                        case "ROLE_LANDLORD":
                            return <div className="flex items-center gap-1.5 text-muted-foreground">
                                <HiOutlineHomeModern className="w-4 h-4" />
                                <span>Chủ nhà trọ</span>
                            </div>
                        default:
                            return <></>
                    }
                })()}
            </div>
        </Link>
    )
}

export default FollowerItem