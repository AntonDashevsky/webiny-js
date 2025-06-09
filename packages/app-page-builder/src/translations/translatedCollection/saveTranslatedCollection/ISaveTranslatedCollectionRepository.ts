import { type TranslatedCollection } from "~/translations/translatedCollection/TranslatedCollection.js";

export interface ISaveTranslatedCollectionRepository {
    getLoading(): boolean;
    execute(translatedCollection: TranslatedCollection): Promise<void>;
}
