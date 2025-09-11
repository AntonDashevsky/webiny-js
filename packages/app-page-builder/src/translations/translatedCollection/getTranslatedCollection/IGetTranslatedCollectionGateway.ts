import type { TranslatedCollectionDto } from "./TranslatedCollectionDto";

export interface IGetTranslatedCollectionGateway {
    execute(collectionId: string, languageCode: string): Promise<TranslatedCollectionDto>;
}
