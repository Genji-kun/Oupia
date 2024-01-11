// 'use client';

// import React, { useState } from 'react';

// import { useTabs } from '@/hooks/use-tabs';
// import { Framer } from '@/lib/framer';

// const AssetTypeTab = () => {
//     const [hookProps] = useState({
//         tabs: [
//             {
//                 label:
//                     <div>
//                         Tất cả
//                     </div>,
//                 id: 'All',
//             },
//             {
//                 label: 'Dãy trọ',
//                 id: 'boardingHouse',
//             },
//             {
//                 label: 'Hệ thống nhà chung',
//                 id: 'sharedHouseSystem',
//             },
//             {
//                 label: 'Chung cư',
//                 id: 'apartment',
//             },
//             {
//                 label: 'Ký túc xá',
//                 id: 'dormiroty',
//             },
//             {
//                 label: 'Căn hộ mini',
//                 id: 'studioApartment',
//             },
//             {
//                 label: 'Nhà nguyên căn',
//                 id: 'entireHouse',
//             },
//         ],
//         initialTabId: 'Matches',
//     });
//     const framer = useTabs(hookProps);

//     return (
//         <div className="w-full flex flex-col">
//             <div className="border-b w-full items-center justify-center flex border-border">
//                 <Framer.Tabs {...framer.tabProps} />
//             </div>
//         </div>
//     );
// };

// export default AssetTypeTab;