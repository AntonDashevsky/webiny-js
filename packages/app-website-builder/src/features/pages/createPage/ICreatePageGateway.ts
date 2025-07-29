import type { PageDto } from "./PageDto.js";
import type { PageGqlDto } from "./PageGqlDto.js";

export interface ICreatePageGateway {
    execute: (pageDto: PageDto) => Promise<PageGqlDto>;
}
