import type { PbContext } from "~/types";
import { GetModel } from "~/translations/GetModel";
import type { TranslatedCollectionDTO } from "~/translations/translatedCollection/repository/mappers/TranslatedCollectionDTO";
import type { TranslatedCollection } from "~/translations/translatedCollection/domain/TranslatedCollection";
import { TranslatedCollectionMapper } from "~/translations/translatedCollection/repository/mappers/TranslatedCollectionMapper";

export class CreateTranslatedCollectionRepository {
    private readonly context: PbContext;

    constructor(context: PbContext) {
        this.context = context;
    }

    async execute(collection: TranslatedCollection): Promise<void> {
        const model = await GetModel.byModelId(this.context, "translatedCollection");

        await this.context.cms.createEntry<TranslatedCollectionDTO>(
            model,
            TranslatedCollectionMapper.toDTO(collection)
        );
    }
}
