import { TrashBinItemDTO } from "~/Domain/index.js";

export interface ISelectItemsController {
    execute: (items: TrashBinItemDTO[]) => Promise<void>;
}
