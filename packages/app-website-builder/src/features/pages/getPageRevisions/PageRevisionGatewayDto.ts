import type { WbStatus } from "~/constants.js";

export interface PageRevisionGatewayDto {
    id: string;
    entryId: string;
    version: number;
    title: string;
    status: WbStatus;
    savedOn: string;
    locked: boolean;
}
