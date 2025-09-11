import type { PageDto } from "./PageDto.js";
import type { PageGqlDto } from "./PageGqlDto.js";

export interface IUpdatePageGateway {
    execute: (page: PageDto) => Promise<PageGqlDto>;
}
