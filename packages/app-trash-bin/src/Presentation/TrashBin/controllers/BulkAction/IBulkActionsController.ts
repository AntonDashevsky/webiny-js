import type { TrashBinBulkActionsParams } from "~/types";

export interface IBulkActionsController {
    execute: (params: TrashBinBulkActionsParams) => Promise<void>;
}
