import { type TranslatedCollectionDto } from "./TranslatedCollectionDto.js";

export interface IGetTranslatedCollectionGateway {
    execute(collectionId: string, languageCode: string): Promise<TranslatedCollectionDto>;
}
