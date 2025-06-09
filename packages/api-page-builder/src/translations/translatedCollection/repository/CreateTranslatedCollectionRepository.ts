import { type PbContext } from "~/types.js";
import { GetModel } from "~/translations/GetModel.js";
import { type TranslatedCollectionDTO } from "~/translations/translatedCollection/repository/mappers/TranslatedCollectionDTO.js";
import { type TranslatedCollection } from "~/translations/translatedCollection/domain/TranslatedCollection.js";
import { TranslatedCollectionMapper } from "~/translations/translatedCollection/repository/mappers/TranslatedCollectionMapper.js";

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
