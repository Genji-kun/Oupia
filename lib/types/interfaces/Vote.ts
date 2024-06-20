import { Vote, VoteType } from "../enums";

export interface IVote {
    id: number,
    reason: string,
    type: VoteType,
    vote: Vote,
    instanceId: number,
    voterId: number,
    voterUsername: string,
    voterFullName: string,
    avatar: string,
    score: number,
    createdAt: Date
}

export interface IVoteRequest {
    type: VoteType,
    vote: Vote,
    reason: string,
    targetId: number
}