export interface ReviewRequest {
    content?: string,
    star?: number,
    assetId?: number,
}

export interface ReviewResponse {
    id: number,
    userId: number,
    avatar: string,
    fullName: string,
    username: string,
    role: "ROLE_TENANT" | "ROLE_LANDLORD" | "ROLE_ADMIN",
    content: string,
    star: number,
    score: number,
    createdAt: Date,
    updatedAt: Date,    
}