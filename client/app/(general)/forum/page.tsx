import React from 'react';
import PostContainer from './_components/post-container';
import PostUtilities from './_components/post-utilities';

const ForumPage = () => {
    return (
        <div className="flex flex-col gap-y-6 py-6">
            <PostUtilities />
            <PostContainer />
        </div>
    );
};

export default ForumPage;