import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

// Tạo một interface cho User
interface Dropdown {
    menuContent: string;
    setMenuContent: Dispatch<SetStateAction<string>>;
}

// Tạo Context
const DropdownContext = createContext<Dropdown | null>(null);

// Tạo Provider
export const UserProvider = ({ children }: { children: any }) => {
    const [menuContent, setMenuContent] = useState('user');

    return (
        <DropdownContext.Provider value={{ menuContent, setMenuContent }}>
            {children}
        </DropdownContext.Provider>
    );
};

// Tạo custom hook để sử dụng User Context
export const useDropdown = () => {
    const context = useContext(DropdownContext);
    if (context === undefined) {
        throw new Error('useDropdown must be used within a UserProvider');
    }
    return context;
};
