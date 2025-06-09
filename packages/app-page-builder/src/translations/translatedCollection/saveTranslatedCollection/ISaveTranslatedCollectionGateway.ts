import { type TranslatedCollectionInputDto } from "~/translations/translatedCollection/saveTranslatedCollection/TranslatedCollectionInputDto.js";
import { type TranslatedCollectionDto } from "~/translations/translatedCollection/getTranslatedCollection/TranslatedCollectionDto.js";

export interface ISaveTranslatedCollectionGateway {
    execute(
        translatedCollectionDto: TranslatedCollectionInputDto
    ): Promise<TranslatedCollectionDto>;
}
