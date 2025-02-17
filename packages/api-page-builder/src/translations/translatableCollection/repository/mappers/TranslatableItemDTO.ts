import { Identity } from "~/translations/Identity.js";

export interface TranslatableItemDTO {
    itemId: string;
    value: string;
    context: Record<string, any> | undefined;
    modifiedOn: string;
    modifiedBy: Identity;
}
