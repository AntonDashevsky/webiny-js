import { ListCache } from "../ListCache";
import type { TranslatedCollection } from "~/translations/translatedCollection/TranslatedCollection";

export const translatedCollectionCache = new ListCache<TranslatedCollection>();
