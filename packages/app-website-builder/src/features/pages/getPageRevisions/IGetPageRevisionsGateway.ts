import type { PageRevisionGatewayDto } from "./PageRevisionGatewayDto.js";

export interface IGetPageRevisionsGateway {
    execute: (pageId: string) => Promise<PageRevisionGatewayDto[]>;
}
