import type { PageRevisionGatewayDto } from "./PageRevisionGatewayDto";

export interface IGetPageRevisionsGateway {
    execute: (pageId: string) => Promise<PageRevisionGatewayDto[]>;
}
