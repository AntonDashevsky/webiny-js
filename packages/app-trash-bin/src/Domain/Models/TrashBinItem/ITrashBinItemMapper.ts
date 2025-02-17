import { TrashBinItemDTO } from "./TrashBinItem.js";

export interface ITrashBinItemMapper<TItem extends Record<string, any>> {
    toDTO: (data: TItem) => TrashBinItemDTO;
}
