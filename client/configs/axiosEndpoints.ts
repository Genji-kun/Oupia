export const authEndpoints = {
    "signIn": `/auth/login/`,
    "signUp": `/store/register/`,
    "currentUser": `/auth/current-user/`,
    "getAuthToken": `/auth/auth-token/`,
}

export const vnpEndpoints = {
    "provinces": `/provinces/?basic=true&limit=100`,
    "provId": (id: number) => `/provinces/${id}`,
    "distId": (id: number) => `/districts/${id}`
}

export const Endpoints = {
    "assets": `/motels/`,
}

export const postEndpoints = {
    "posts": `/store/posts/`,
    "postList": `/search/posts/`,
    "updatePost": (id: number) => `/store/posts/${id}/`,
    "deletePost": (id: number) => `/store/posts/${id}/`
}

export const userEndpoints = {
    "getUserByUsername": (username: string) => `/store/users/${username}/`
}


export const followEndpoints = {
    "unFollow": `/store/follows/`,
    "followUser": `/store/follows/`,
    "checkFollow": `/store/follows/`,
    "getFollowersInfo": (id: number) => `/store/follows/${id}/followers/`,
}