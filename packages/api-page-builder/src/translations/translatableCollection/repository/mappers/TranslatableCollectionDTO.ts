import { TranslatableItemDTO } from "./TranslatableItemDTO.js";

export interface TranslatableCollectionDTO {
    collectionId: string;
    items: TranslatableItemDTO[];
}
