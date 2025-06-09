import { type PbContext } from "~/types.js";
import { GetModel } from "~/translations/GetModel.js";
import { type TranslatableCollection } from "~/translations/translatableCollection/domain/TranslatableCollection.js";
import { TranslatableCollectionMapper } from "~/translations/translatableCollection/repository/mappers/TranslatableCollectionMapper.js";
import { WebinyError } from "@webiny/error";
import { createIdentifier } from "@webiny/utils";

export class UpdateTranslatableCollectionRepository {
    private readonly context: PbContext;

    constructor(context: PbContext) {
        this.context = context;
    }

    async execute(collection: TranslatableCollection): Promise<void> {
        const model = await GetModel.byModelId(this.context, "translatableCollection");
        const dto = TranslatableCollectionMapper.toDTO(collection);

        if (!dto.id) {
            throw new WebinyError({
                message: "Updating a record without an ID is not allowed!",
                code: "UPDATE_WITHOUT_ID_NOT_ALLOWED"
            });
        }

        const cmsId = createIdentifier({
            id: dto.id,
            version: 1
        });

        await this.context.cms.updateEntry(model, cmsId, dto);
    }
}
