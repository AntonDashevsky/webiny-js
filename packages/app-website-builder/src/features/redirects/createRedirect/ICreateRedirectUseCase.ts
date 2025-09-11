import type { WbLocation } from "~/types.js";
import type { Redirect } from "~/domain/Redirect/index.js";

export interface CreateRedirectParams {
    location: WbLocation;
    redirectFrom: string;
    redirectTo: string;
    redirectType: string;
    isEnabled: boolean;
}

export interface ICreateRedirectUseCase {
    execute: (params: CreateRedirectParams) => Promise<Redirect>;
}
