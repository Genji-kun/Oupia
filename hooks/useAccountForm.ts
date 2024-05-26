import { IUserRegister } from '@/lib/types/interfaces';
import { IRegisterAccountForm } from '@/lib/types/interfaces/Register';
import { useState } from 'react';

export const useUserForm = (initialUser: IRegisterAccountForm) => {
    const [user, setUser] = useState<IUserRegister>(initialUser);

    const updateUser = (updates: Partial<IRegisterAccountForm>) => {
        setUser((prevUser) => ({
            ...prevUser,
            ...updates,
        }));
    };

    const updateAccount = (updates: Partial<IUserRegister['account']>) => {
        setUser((prevUser) => ({
            ...prevUser,
            account: {
                ...prevUser.account,
                ...updates,
            },
        }));
    };

    return { user, updateUser, updateAccount };
};
