import { type Identity } from "~/translations/Identity.js";

export interface TranslatedItemDTO {
    itemId: string;
    value?: string;
    translatedOn?: string;
    translatedBy?: Identity;
}
