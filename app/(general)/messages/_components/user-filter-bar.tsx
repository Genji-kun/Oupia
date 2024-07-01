"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { searchEndpoints } from '@/configs/axiosEndpoints';
import { useMessageSearchContext } from '@/contexts/message-search-context';
import { useDebounce } from '@/hooks/useDebounce';
import { api } from '@/lib/api';
import { ArrowLeft, Search } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

const UserFilterBar = () => {

    const { setSearchUsers, userQuery, setUserQuery, setShowResults, isLoading, setIsLoading } = useMessageSearchContext();

    const inputRef = useRef<HTMLDivElement>(null);

    const fetchUserData = useDebounce(async (searchQuery: string) => {
        if (searchQuery) {
            try {
                const res = await api.get(searchEndpoints["users"], {
                    params: {
                        keyword: searchQuery,
                        size: 6
                    }
                });
                setSearchUsers(res.data.content);
            } catch (error) {
                console.log(error);
            }
            finally {
                setIsLoading(false);
            }
        }
    }, 500);

    useEffect(() => {
        setIsLoading(true);
        fetchUserData(userQuery);
        return () => {
            fetchUserData.cancel();
        }
    }, [userQuery, fetchUserData, setIsLoading])



    useEffect(() => {
        const handleKeyDown = (evt: KeyboardEvent) => {

            if (evt.key === "Escape") {
                setUserQuery("");
                setShowResults(false);
            }
        }

        !userQuery && setShowResults(false);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [userQuery, setShowResults, setUserQuery])



    return (
        <div className="flex items-center gap-2 p-5">
            <div ref={inputRef} className="relative w-full flex items-center gap-2">
                {userQuery.length > 0 &&
                    <Button
                        onClick={() => {
                            setUserQuery("");
                        }}
                        variant={"ghost"}
                        className="w-fit h-fit p-3 rounded-lg">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                }
                <div className="relative hidden xl:block w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10" />
                    <Input
                        value={userQuery}
                        onChange={(evt) => { setUserQuery(evt.target.value) }}
                        className="p-5 pl-10 dark:bg-oupia-sub"
                        placeholder="Tìm kiếm người dùng..." />
                </div>
            </div>

        </div>
    );
};

export default UserFilterBar;