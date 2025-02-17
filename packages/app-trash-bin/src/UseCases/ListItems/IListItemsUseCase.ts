import { TrashBinListQueryVariables } from "~/types.js";

export interface IListItemsUseCase {
    execute: (params?: TrashBinListQueryVariables) => Promise<void>;
}
