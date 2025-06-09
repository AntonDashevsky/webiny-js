import { type TrashBinBulkActionsParams } from "~/types.js";

export interface IBulkActionsController {
    execute: (params: TrashBinBulkActionsParams) => Promise<void>;
}
