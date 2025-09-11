import { WebinyError } from "@webiny/error";
import type { PbContext } from "~/types";
import { GetModel } from "~/translations/GetModel";
import type { TranslatedCollection } from "~/translations/translatedCollection/domain/TranslatedCollection";
import type { TranslatedCollectionDTO } from "~/translations/translatedCollection/repository/mappers/TranslatedCollectionDTO";
import { TranslatedCollectionMapper } from "~/translations/translatedCollection/repository/mappers/TranslatedCollectionMapper";

interface GetTranslatedCollectionParams {
    collectionId: string;
    languageCode: string;
}

export class GetTranslatedCollectionRepository {
    private readonly context: PbContext;

    constructor(context: PbContext) {
        this.context = context;
    }

    async execute(params: GetTranslatedCollectionParams): Promise<TranslatedCollection> {
        const model = await GetModel.byModelId(this.context, "translatedCollection");

        try {
            const existingEntry = await this.context.cms.getEntry<TranslatedCollectionDTO>(model, {
                where: {
                    collectionId: params.collectionId,
                    languageCode: params.languageCode,
                    latest: true
                }
            });

            return TranslatedCollectionMapper.fromDTO(existingEntry.values, existingEntry.entryId);
        } catch {
            throw new WebinyError({
                message: `TranslatedCollection "${params.collectionId}" for language "${params.languageCode}" was not found!`,
                code: "NOT_FOUND"
            });
        }
    }
}
