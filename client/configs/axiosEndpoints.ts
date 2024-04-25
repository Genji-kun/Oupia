export const authEndpoints = {
    "signIn": `/auth/login/`,
    "signUp": `/store/register/`,
    "currentUser": `/auth/me/`,
    "getAuthToken": `/auth/auth-token/`,
    "loginSocial": `/auth/social-login/`,
    "registerSocial": `store/register/social/`
}

export const vnpEndpoints = {
    "provinces": `/provinces/?basic=true&limit=100`,
    "provId": (id: number) => `/provinces/${id}`,
    "distId": (id: number) => `/districts/${id}`
}

export const assetsEndpoints = {
    "createAsset": `/store/landlord/assets/`,
    "assets": `/search/assets/`
}

export const postEndpoints = {
    "posts": `/store/posts/`,
    "postList": `/search/posts/`,
    "updatePost": (id: number) => `/store/posts/${id}/`,
    "deletePost": (id: number) => `/store/posts/${id}/`
}

export const userEndpoints = {
    "getUserByUsername": (username: string) => `/store/users/${username}/`,
    "upgrade": `/store/users/upgrade-landlord/`
}


export const followEndpoints = {
    "unFollow": `/store/follows/`,
    "followUser": `/store/follows/`,
    "checkFollow": `/store/follows/`,
    "getFollowersInfo": (id: number) => `/store/follows/${id}/followers/`,
}

export const favouriteEndpoints = {
    "unFavourite": `/store/favourites/`,
    "saveFavour": `/store/favourites/`,
    "favourCount": (id: number) => `/store/favourites/${id}/`,
    "checkFavourite": `/store/favourites/`,
}

export const searchEndpoints = {
    "users": `/search/users/`,
    "amenities" : `/search/amenities/`
}