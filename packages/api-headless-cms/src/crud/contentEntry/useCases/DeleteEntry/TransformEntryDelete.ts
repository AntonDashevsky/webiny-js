import { entryFromStorageTransform } from "~/utils/entryStorage.js";
import { type CmsContext, type CmsEntry, type CmsEntryStorageOperationsDeleteParams, type CmsModel } from "~/types/index.js";

export class TransformEntryDelete {
    private context: CmsContext;

    constructor(context: CmsContext) {
        this.context = context;
    }
    async execute(
        model: CmsModel,
        initialEntry: CmsEntry
    ): Promise<CmsEntryStorageOperationsDeleteParams> {
        const entry = await entryFromStorageTransform(this.context, model, initialEntry);

        return {
            entry
        };
    }
}
