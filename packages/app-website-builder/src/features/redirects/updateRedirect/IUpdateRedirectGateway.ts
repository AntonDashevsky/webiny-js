import type { RedirectDto } from "./RedirectDto.js";
import type { RedirectGqlDto } from "./RedirectGqlDto.js";

export interface IUpdateRedirectGateway {
    execute: (redirect: RedirectDto) => Promise<RedirectGqlDto>;
}
