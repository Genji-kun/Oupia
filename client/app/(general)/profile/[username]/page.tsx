import React from 'react';
import UserIntroduce from './_components/user-introduce';
import PostList from '../../forum/_components/post-list';

const UserProfilePage = () => {

    return (
        <div className="container h-full grid grid-cols-10 gap-4">
            <div className="col-span-3">
                <UserIntroduce />
            </div>
            <div className="col-span-5">
                <PostList />
            </div>
        </div>
    );
};

export default UserProfilePage;