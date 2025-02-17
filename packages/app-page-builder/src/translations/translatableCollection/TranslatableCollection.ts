import { GenericRecord } from "@webiny/app/types.js";

export interface TranslatableCollection {
    collectionId: string;
    items: Array<{
        itemId: string;
        value: string;
        context?: GenericRecord<string>;
    }>;
}
