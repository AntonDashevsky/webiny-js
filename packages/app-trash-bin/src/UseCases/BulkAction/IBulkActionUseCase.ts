import { TrashBinBulkActionsParams } from "~/types.js";

export interface IBulkActionUseCase {
    execute: (action: string, params: TrashBinBulkActionsParams) => Promise<void>;
}
