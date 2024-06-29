import { HOLE_SKY_SCANNER_BASE_URL } from '@/lib/constants/SettingSystem';
import Link from 'next/link';
import React, { ReactNode } from 'react'

const AssetDetailInfoCard = ({ title, icon, content, link }: { title: string, icon: ReactNode, content?: string, link?: string }) => {
    return (
        <div className="flex flex-col gap-1 border p-3 rounded-lg">
            <div className='flex items-start justify-between'>
                <h4 className="font-semibold text-lg text-primary uppercase">{title}</h4>
                {icon}
            </div>
            {
                content && <p className='text-muted-foreground text-sm text-wrap'>
                    {content}
                </p>
            }
            {
                link && HOLE_SKY_SCANNER_BASE_URL && <Link href={HOLE_SKY_SCANNER_BASE_URL + link} className='text-muted-foreground text-sm text-wrap truncate'>
                    {link}
                </Link>
            }
        </div>
    )
}

export default AssetDetailInfoCard;