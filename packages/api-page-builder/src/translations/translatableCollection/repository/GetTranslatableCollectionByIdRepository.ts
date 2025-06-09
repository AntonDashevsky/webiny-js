import { WebinyError } from "@webiny/error";
import { type PbContext } from "~/types.js";
import { GetModel } from "~/translations/GetModel.js";
import { type TranslatableCollection } from "~/translations/translatableCollection/domain/TranslatableCollection.js";
import { TranslatableCollectionMapper } from "~/translations/translatableCollection/repository/mappers/TranslatableCollectionMapper.js";
import { type TranslatableCollectionDTO } from "~/translations/translatableCollection/repository/mappers/TranslatableCollectionDTO.js";

export class GetTranslatableCollectionByIdRepository {
    private readonly context: PbContext;

    constructor(context: PbContext) {
        this.context = context;
    }

    async execute(collectionId: string): Promise<TranslatableCollection> {
        const model = await GetModel.byModelId(this.context, "translatableCollection");

        try {
            const existingEntry = await this.context.cms.getEntry<TranslatableCollectionDTO>(
                model,
                {
                    where: { collectionId, latest: true }
                }
            );

            return TranslatableCollectionMapper.fromDTO(
                existingEntry.values,
                existingEntry.entryId
            );
        } catch {
            throw new WebinyError({
                message: `TranslatableCollection "${collectionId}" not found!`,
                code: "NOT_FOUND"
            });
        }
    }
}
