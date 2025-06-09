import { type TrashBinItem } from "~/Domain/index.js";

export interface ISelectItemsUseCase {
    execute: (items: TrashBinItem[]) => Promise<void>;
}
