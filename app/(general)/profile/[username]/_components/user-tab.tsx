// 'use client';

// import React, { useState } from 'react';

// import { Framer } from '@/lib/framer';
// import { LayoutGrid, UserRound, UsersRound } from 'lucide-react';
// import { useParams } from 'next/navigation';
// import { useProfileContext } from '@/contexts/profile-context';
// import { BsHouse } from 'react-icons/bs';
// import { useTabs } from '@/hooks';

// const UserTab = () => {
//     const params = useParams();
//     const { username } = params;
//     const { userInfoData } = useProfileContext();

//     const defaultTabs = [
//         {
//             label:
//                 <div className="flex gap-x-2 items-center">
//                     <LayoutGrid size="16" />
//                     <span>Tổng quan</span>
//                 </div>,
//             id: 'gerenal',
//             link: `/profile/${username}`
//         },
//         {
//             label:
//                 <div className="flex gap-x-2 items-center">
//                     <UserRound size="16" />
//                     <span>Thông tin</span>
//                 </div>,
//             id: 'info',
//             link: `/profile/${username}/information`
//         },
//         {
//             label:
//                 <div className="flex gap-x-2 items-center">
//                     <UsersRound size="16" />
//                     <span>Người theo dõi</span>
//                 </div>,
//             id: 'follows',
//             link: `/profile/${username}/follows`
//         }
//     ];

//     const [hookProps] = useState({
//         tabs: userInfoData?.role === "ROLE_TENANT" ? defaultTabs : [...defaultTabs, {
//             label:
//                 <div className="flex gap-x-2 items-center">
//                     <BsHouse size="16" />
//                     <span>Căn hộ</span>
//                 </div>,
//             id: 'follows',
//             link: `/profile/${username}/assets`
//         }
//         ],
//         initialTabId: 'Matches',
//     });
//     const framer = useTabs(hookProps);

//     return (
//         <div className="w-full flex flex-col shadow">
//             <div className="border-b w-full items-center flex border-border">
//                 <Framer.Tabs {...framer.tabProps} />
//             </div>
//         </div>
//     );
// };

// export default UserTab;