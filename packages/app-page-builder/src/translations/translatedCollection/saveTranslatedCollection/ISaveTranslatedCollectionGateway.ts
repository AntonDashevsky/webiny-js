import { TranslatedCollectionInputDto } from "~/translations/translatedCollection/saveTranslatedCollection/TranslatedCollectionInputDto.js";
import { TranslatedCollectionDto } from "~/translations/translatedCollection/getTranslatedCollection/TranslatedCollectionDto.js";

export interface ISaveTranslatedCollectionGateway {
    execute(
        translatedCollectionDto: TranslatedCollectionInputDto
    ): Promise<TranslatedCollectionDto>;
}
