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
                avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1696484302/z8ch1cp7vfkdrcxgfbai.jpg",
                username: "phatvo"
            }
        },
        {
            postContent: "Tìm nhà trọ ở thành phố Hà Nội Quận Ba Đình có máy lạnh, chổ giữ xe",
            user: {
                name: "Võ Phú Phát",
                avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1696484302/z8ch1cp7vfkdrcxgfbai.jpg",
                username: "phatvo"
            }
        },
        {
            postContent: "Em cần tìm nhà trọ giá sinh viên gần trong khu vực quận 12 ngay gần Tân Thới Nhất 8 để tiện đường đi học ạ.",
            user: {
                name: "Võ Phú Phát",
                avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1696484302/z8ch1cp7vfkdrcxgfbai.jpg",
                username: "phatvo"
            }
        },
        {
            postContent: "Tìm nhà trọ ở thành phố Hà Nội Quận Ba Đình có máy lạnh, chổ giữ xe",
            user: {
                name: "Võ Phú Phát",
                avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1696484302/z8ch1cp7vfkdrcxgfbai.jpg",
                username: "phatvo"
            }
        },
        {
            postContent: "Em là sinh viên năm nhất cần kiếm nhà trọ khu vực ba đình hà nội có máy lạnh, chổ giữ xe an toàn",
            user: {
                name: "Võ Phú Phát",
                avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1696484302/z8ch1cp7vfkdrcxgfbai.jpg",
                username: "phatvo"
            }
        },
    ]);

    return (
        <div className="flex flex-col gap-y-2 xl:gap-y-6 mt-6">
            {posts.map((post, index) => {
                return <PostItem key={index} post={post} />
            })}
        </div>
    );
};

export default PostList;