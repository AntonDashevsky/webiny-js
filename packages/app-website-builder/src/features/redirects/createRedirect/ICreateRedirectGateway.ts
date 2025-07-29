import type { RedirectDto } from "./RedirectDto.js";
import type { RedirectGqlDto } from "./RedirectGqlDto.js";

export interface ICreateRedirectGateway {
    execute: (pageDto: RedirectDto) => Promise<RedirectGqlDto>;
}
