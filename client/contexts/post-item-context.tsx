// "use client"

// import { PostResponse } from '@/interfaces/Post';
// import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// interface IPostItemContext {
//     posts: PostResponse[];
//     setPosts: React.Dispatch<React.SetStateAction<PostResponse[]>>;
// }

// const PostItemContext = createContext<IPostItemContext | undefined>(undefined);

// export const PostItemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const [post, setPost] = useState<PostResponse | undefined>();
//     const [isSorted, setIsSorted] = useState<boolean>(false);

//     return (
//         <PostItemContext.Provider value={{ posts, setPosts }}>
//             {children}
//         </PostItemContext.Provider>
//     );
// };


// export const usePostItemContext = (): IPostItemContext => {
//     const context = useContext(PostItemContext);
//     if (!context) {
//         throw new Error('usePostItemContext phải được dùng trong PostItemProvider');
//     }
//     return context;
// };
