export const authEndpoints = {
    "sign-in": `/auth/login/`,
    "sign-up": `/store/register/`,
    "current-user": `/auth/current-user/`,
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
    "posts": `/posts/`
}
