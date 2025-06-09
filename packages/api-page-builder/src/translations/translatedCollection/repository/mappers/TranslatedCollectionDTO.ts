import { type TranslatedItemDTO } from "./TranslatedItemDTO.js";

export interface TranslatedCollectionDTO {
    collectionId: string;
    languageCode: string;
    items: TranslatedItemDTO[];
}
