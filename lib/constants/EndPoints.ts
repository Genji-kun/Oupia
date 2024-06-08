export const AUTH_ENDPOINTS = {
    SIGN_IN: `auth/login/`,
    SIGN_UP: `store/register/`,
    CURRENT_USER: `auth/me/`,
    GET_AUTH_TOKEN: `auth/auth-token/`,
    SOCIAL_LOGIN: `auth/social-login/`,
}

export const ASSET_ENDPOINTS = {
    GET_ASSET_LIST: `search/assets/`,
    CREATE: `store/landlord/assets/`,
    GET_ASSET_BY_SLUG: (slug: string) => `search/assets/${slug}`,
    GET_ASSET_BY_POLYGON: `search/assets/polygon/`,
}

export const POST_ENDPOINTS = {
    GET_POST_LIST: `search/posts/`,
    CREATE: `store/posts/`,
}

export const USER_ENDPOINTS = {
    GET_INFO: (username: string) => `store/users/${username}/`,
    UPGRADE_LANDLORD: `/store/users/upgrade-landlord/`
}

export const REVIEW_ENDPOINTS = {
    GET_REVIEWS: `/store/reviews/`,
    ADD_REVIEWS: `/store/reviews/`
}