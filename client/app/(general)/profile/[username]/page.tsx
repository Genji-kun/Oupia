import React from 'react';
import UserIntroduce from './_components/user-introduce';
import PostList from '../../forum/_components/post-list';
import SuggestUserList from './_components/suggest-user-list';

const UserProfilePage = () => {

    return (
        <div className="container h-full grid grid-cols-7 gap-4">
            <div className="col-span-2">
                <UserIntroduce />
            </div>
            <div className="col-span-3">
                <PostList />
            </div>
            <div className="col-span-2">
                <SuggestUserList />
            </div>
        </div>
    );
};

export default UserProfilePage;