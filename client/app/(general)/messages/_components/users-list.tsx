"use client"

import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import UserFilterBar from './user-filter-bar';

const UsersList = () => {
    return (
        <div className="flex flex-col gap-6 h-full p-5 w-1/4 bg-background">
            <UserFilterBar />
            <div className="flex items-center space-x-4">
                <Skeleton className="bg-muted-foreground/25 h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="bg-muted-foreground/25 h-4 w-[250px]" />
                    <Skeleton className="bg-muted-foreground/25 h-4 w-[200px]" />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <Skeleton className="bg-muted-foreground/25 h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="bg-muted-foreground/25 h-4 w-[150px]" />
                    <Skeleton className="bg-muted-foreground/25 h-4 w-[100px]" />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <Skeleton className="bg-muted-foreground/25 h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="bg-muted-foreground/25 h-4 w-[250px]" />
                    <Skeleton className="bg-muted-foreground/25 h-4 w-[150px]" />
                </div>
            </div>
        </div>
    );
};

export default UsersList;