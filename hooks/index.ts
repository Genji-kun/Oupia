// import { ReactNode, useEffect, useState } from 'react';
// import { IUserRegister } from '@/lib/types/interfaces';
// import { IRegisterAccountForm } from '@/lib/types/interfaces/Register';

// export type Tab = { label: ReactNode; id: string, link: string };

// export const useTabs = ({
//     tabs,
//     initialTabId,
//     onChange,
// }: {
//     tabs: Tab[];
//     initialTabId: string;
//     onChange?: (id: string) => void;
// }) => {
//     const [[selectedTabIndex, direction], setSelectedTab] = useState(() => {
//         const indexOfInitialTab = tabs.findIndex((tab) => tab.id === initialTabId);
//         return [indexOfInitialTab === -1 ? 0 : indexOfInitialTab, 0];
//     });

//     return {
//         tabProps: {
//             tabs,
//             selectedTabIndex,
//             onChange,
//             setSelectedTab,
//         },
//         selectedTab: tabs[selectedTabIndex],
//         contentProps: {
//             direction,
//             selectedTabIndex,
//         },
//     };
// }



// export const useUserForm = (initialUser: IRegisterAccountForm) => {
//     const [user, setUser] = useState<IUserRegister>(initialUser);

//     const updateUser = (updates: Partial<IRegisterAccountForm>) => {
//         setUser((prevUser) => ({
//             ...prevUser,
//             ...updates,
//         }));
//     };

//     const updateAccount = (updates: Partial<IUserRegister['account']>) => {
//         setUser((prevUser) => ({
//             ...prevUser,
//             account: {
//                 ...prevUser.account,
//                 ...updates,
//             },
//         }));
//     };

//     return { user, updateUser, updateAccount };
// };

// export const useDebounce = <T,>(value: T, delay: number): T => {
//     const [debouncedValue, setDebouncedValue] = useState<T>(value);

//     useEffect(() => {
//         const handler = setTimeout(() => {
//             setDebouncedValue(value);
//         }, delay);

//         return () => {
//             clearTimeout(handler);
//         };
//     }, [value, delay]);

//     return debouncedValue;
// }