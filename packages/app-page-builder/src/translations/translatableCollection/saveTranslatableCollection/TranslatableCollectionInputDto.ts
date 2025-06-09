import { type GenericRecord } from "@webiny/app/types.js";

export interface TranslatableCollectionInputDto {
    collectionId: string;
    items: Array<{
        itemId: string;
        value: string;
        context?: GenericRecord<string>;
    }>;
}
