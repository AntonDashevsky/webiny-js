import { type TrashBinBulkActionsGatewayParams, type TrashBinBulkActionsResponse } from "~/types.js";

export interface ITrashBinBulkActionsGateway {
    execute: (params: TrashBinBulkActionsGatewayParams) => Promise<TrashBinBulkActionsResponse>;
}
