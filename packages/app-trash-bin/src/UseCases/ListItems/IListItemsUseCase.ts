import type { TrashBinListQueryVariables } from "~/types";

export interface IListItemsUseCase {
    execute: (params?: TrashBinListQueryVariables) => Promise<void>;
}
