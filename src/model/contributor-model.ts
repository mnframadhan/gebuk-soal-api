import { Contributor } from "@prisma/client";
import { Paging } from "./pages";

export type ContributorRequest = {

    username: string;
    email: string;
    password: string;

}

export type ContributorLoginRequest = {

    username: string;
    password: string;

}


export type ContributorResponse = {
    id: string;
    username: string;
    email: string;
    created_at : Date;
    contribution_points: number;
    n_soal : number;
    token? : string | null;
}

export type SmallContributorResponse = {
    username: string;
    contribution_points: number;
}

export type minimizedSoalCreatedResponse = {
    created_at: Date;
    id: string;
    text: string;
    type: string;
}


export function toContributorResponse(contributor: Contributor) : ContributorResponse {

    return {
        id : contributor.id,
        username : contributor.username,
        email : contributor.email,
        created_at : contributor.created_at,
        contribution_points : contributor.contribution_points,
        n_soal : contributor.n_soal,
        token: contributor.token || undefined
    }
}

export function toMinimizedSoalCreatedResponse(contributor: minimizedSoalCreatedResponse[], pagination: Paging ) {
    return {
        data: contributor as Array<minimizedSoalCreatedResponse>,
        pagination: pagination
    }
}

export function toContributorLeaderboard(contributor: SmallContributorResponse[], pagination: Paging) {

    return {
        data: contributor as Array<SmallContributorResponse>,
        pagination: pagination
    }
}