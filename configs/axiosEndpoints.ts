export const authEndpoints = {
    "signIn": `/auth/login/`,
    "signUp": `/store/register/`,
    "currentUser": `/auth/me/`,
    "getAuthToken": `/auth/auth-token/`,
    "loginSocial": `/auth/social-login/`,
}

export const vnpEndpoints = {
    "provinces": `/provinces/`,
    "districts": `/districts/`
}

export const assetsEndpoints = {
    "createAsset": `/store/landlord/assets/`,
    "assets": `/search/assets/`,
    "getAssetBySlugName": (slug: string) => `search/assets/${slug}`,
    "polygon": `search/assets/polygon/`
}

export const reviewEndpoints = {
    "getReviews": `/store/reviews/`,
    "addReview": `/store/reviews/`,
}

export const postEndpoints = {
    "posts": `/store/posts/`,
    "postList": `/search/posts/`,
    "updatePost": (id: number) => `/store/posts/${id}/`,
    "deletePost": (id: number) => `/store/posts/${id}/`
}

export const commentEndpoints = {
    "comments": `/store/comments/`,
    "addComment": `/store/comments/`,
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
    "getFollowings": (id: number) => `/store/follows/${id}/followings/`,
}

export const favouriteEndpoints = {
    "unFavourite": `/store/favourites/`,
    "saveFavour": `/store/favourites/`,
    "favourCount": (id: number) => `/store/favourites/${id}/`,
    "checkFavourite": `/store/favourites/`,
}

export const searchEndpoints = {
    "users": `/search/users/`,
    "amenities": `/search/amenities/`
}