import { Loading } from "~/translations/Loading.js";
import { TranslatedCollection } from "~/translations/translatedCollection/TranslatedCollection.js";
import { GenericRecord } from "@webiny/app/types.js";

export interface IGetTranslatedCollectionRepository {
    execute(collectionId: string, languageCode: string): Promise<TranslatedCollection | undefined>;
    getLoading(): Loading;
    getTranslatedCollection<TContext extends GenericRecord<string> = GenericRecord<string>>(
        collectionId: string,
        languageCode: string
    ): TranslatedCollection<TContext> | undefined;
}
