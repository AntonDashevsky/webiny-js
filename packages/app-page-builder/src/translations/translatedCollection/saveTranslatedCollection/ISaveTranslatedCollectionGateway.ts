import type { TranslatedCollectionInputDto } from "~/translations/translatedCollection/saveTranslatedCollection/TranslatedCollectionInputDto";
import type { TranslatedCollectionDto } from "~/translations/translatedCollection/getTranslatedCollection/TranslatedCollectionDto";

export interface ISaveTranslatedCollectionGateway {
    execute(
        translatedCollectionDto: TranslatedCollectionInputDto
    ): Promise<TranslatedCollectionDto>;
}
