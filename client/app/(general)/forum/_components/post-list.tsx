"use client";

import { Post } from '@/interfaces/Post';
import React, { useState } from 'react';
import PostItem from './post-item';

const PostList = () => {

    const [posts, setPosts] = useState<Post[]>([
        {
            postContent: "Em là sinh viên năm nhất cần kiếm nhà trọ khu vực ba đình hà nội có máy lạnh, chổ giữ xe an toàn",
            user: {
                name: "Võ Phú Phát",
                username: "phatvo",
                avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg",
                phoneNumber: "09012345152"
            },
        },
        {
            postContent: "Tìm nhà trọ ở thành phố Hà Nội Quận Ba Đình có máy lạnh, chổ giữ xe",
            user: {
                name: "Võ Phú Phát",
                username: "phatvo",
                avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg",
                phoneNumber: "09012345152"
            },
        },
        {
            postContent: "Em cần tìm nhà trọ giá sinh viên gần trong khu vực quận 12 ngay gần Tân Thới Nhất 8 để tiện đường đi học ạ.",
            user: {
                name: "Võ Phú Phát",
                username: "phatvo",
                avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg",
                phoneNumber: "09012345152"
            },
        },
        {
            postContent: "Tìm nhà trọ ở thành phố Hà Nội Quận Ba Đình có máy lạnh, chổ giữ xe",
            user: {
                name: "Võ Phú Phát",
                username: "phatvo",
                avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg",
                phoneNumber: "09012345152"
            },
        },
        {
            postContent: "Em là sinh viên năm nhất cần kiếm nhà trọ khu vực ba đình hà nội có máy lạnh, chổ giữ xe an toàn",
            user: {
                name: "Võ Phú Phát",
                username: "phatvo",
                avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg",
                phoneNumber: "09012345152"
            },
        },
    ]);

    return (
        <div className="flex flex-col gap-y-4 xl:gap-y-6 py-4 lg:py-6">
            {posts.map((post, index) => {
                return <PostItem key={index} post={post} />
            })}
        </div>
    );
};

export default PostList;