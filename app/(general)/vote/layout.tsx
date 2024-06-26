import { Separator } from '@/components/ui/separator';
import dynamic from 'next/dynamic';

const VoteSidebar = dynamic(() => import('./_components/vote-sidebar'), {
    ssr: false
});


export default function VoteLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="container px-2 py-4 flex flex-col lg:grid lg:grid-cols-4 gap-4">
            <VoteSidebar />
            <Separator className="block lg:hidden" />
            {children}
        </div>
    )
}
