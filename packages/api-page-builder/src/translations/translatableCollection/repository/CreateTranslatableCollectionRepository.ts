import { type PbContext } from "~/types.js";
import { type TranslatableCollection } from "~/translations/translatableCollection/domain/TranslatableCollection.js";
import { GetModel } from "~/translations/GetModel.js";
import { TranslatableCollectionMapper } from "~/translations/translatableCollection/repository/mappers/TranslatableCollectionMapper.js";
import { type TranslatableCollectionDTO } from "~/translations/translatableCollection/repository/mappers/TranslatableCollectionDTO.js";

export class CreateTranslatableCollectionRepository {
    private readonly context: PbContext;

    constructor(context: PbContext) {
        this.context = context;
    }

    async execute(collection: TranslatableCollection): Promise<void> {
        const model = await GetModel.byModelId(this.context, "translatableCollection");

        await this.context.cms.createEntry<TranslatableCollectionDTO>(
            model,
            TranslatableCollectionMapper.toDTO(collection)
        );
    }
}
