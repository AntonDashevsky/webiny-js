import { type PbContext } from "~/types.js";
import { GetModel } from "~/translations/GetModel.js";
import { type TranslatedCollectionDTO } from "~/translations/translatedCollection/repository/mappers/TranslatedCollectionDTO.js";

export interface DeleteTranslatedCollectionParams {
    collectionId: string;
    languageCode?: string;
}

export class DeleteTranslatedCollectionRepository {
    private readonly context: PbContext;

    constructor(context: PbContext) {
        this.context = context;
    }

    async execute(params: DeleteTranslatedCollectionParams): Promise<void> {
        const model = await GetModel.byModelId(this.context, "translatedCollection");

        const filter: DeleteTranslatedCollectionParams = {
            collectionId: params.collectionId
        };

        if (params.languageCode) {
            filter.languageCode = params.languageCode;
        }

        const [entries] = await this.context.cms.listEntries<TranslatedCollectionDTO>(model, {
            where: { latest: true, ...filter }
        });

        await Promise.all(
            entries.map(entry => {
                return this.context.cms.deleteEntry(model, entry.entryId, {
                    permanently: true
                });
            })
        );
    }
}
