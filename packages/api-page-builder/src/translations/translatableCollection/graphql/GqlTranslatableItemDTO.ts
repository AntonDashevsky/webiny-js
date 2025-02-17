import { Identity } from "~/translations/Identity.js";

export interface GqlTranslatableItemDTO {
    itemId: string;
    value: string;
    context?: Record<string, any>;
    modifiedOn?: string;
    modifiedBy: Identity;
}
