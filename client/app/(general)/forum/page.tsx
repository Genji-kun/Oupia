import React from 'react';
import PostUtilities from './_components/post-utilities';
import PostList from './_components/post-list';
import { ForumProvider } from '@/contexts/forum-context';

const ForumPage = () => {
    return (
        <ForumProvider>
            <div className="flex flex-col gap-y-6 py-6">
                <PostUtilities />
                <PostList />
            </div>
        </ForumProvider>
    );
};

export default ForumPage;