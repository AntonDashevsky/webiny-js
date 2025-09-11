import type { TrashBinListQueryVariables, TrashBinMetaResponse } from "~/types.js";

export interface ITrashBinListGateway<TItem> {
    execute: (params: TrashBinListQueryVariables) => Promise<[TItem[], TrashBinMetaResponse]>;
}
