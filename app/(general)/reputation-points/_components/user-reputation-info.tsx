import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ICurrentUser } from '@/lib/interfaces/response/User';
import { cn } from '@/lib/utils';
import { convert } from '@/utils/convertAvatarAlt';
import React from 'react'

const UserReputationInfo = ({ user }: { user: ICurrentUser }) => {

    return (
        <div className='flex gap-4 items-center'>
            <Avatar className='w-16 h-16'>
                <AvatarImage src={user.avatar} alt={user.fullName} />
                <AvatarFallback>{convert(user.fullName)}</AvatarFallback>
            </Avatar>
            <div className='h-fit'>
                <h3 className='text-muted-foreground'>Điểm của <span className='font-semibold text-foreground'>{user.fullName}</span></h3>
                <h3 className='text-muted-foreground'><span className={cn('font-semibold', user.reputationScore > 0 ? "text-emerald-500" : "text-rose-500")}>{user.reputationScore ?? 0}</span> điểm tiếng tăm.</h3>
            </div>
        </div>
    )
}

export default UserReputationInfo