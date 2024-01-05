"use client";

import React from 'react';
import PostList from './post-list';
import { motion } from "framer-motion";

const PostContainer = () => {
    return (
        <div>
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.25 }}>
                <PostList />
            </motion.div>
        </div >
    );
};

export default PostContainer;