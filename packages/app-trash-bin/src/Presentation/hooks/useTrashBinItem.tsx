import { createGenericContext } from "@webiny/app-admin";
import { type TrashBinItemDTO } from "~/Domain/index.js";

export interface TrashBinItemContext {
    item: TrashBinItemDTO;
}

const { Provider, useHook } = createGenericContext<TrashBinItemContext>("TrashBinItemContext");

export const useTrashBinItem = useHook;
export const TrashBinItemProvider = Provider;
