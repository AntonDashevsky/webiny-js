import { ListCache } from "../ListCache.js";
import { type TranslatedCollection } from "~/translations/translatedCollection/TranslatedCollection.js";

export const translatedCollectionCache = new ListCache<TranslatedCollection>();
