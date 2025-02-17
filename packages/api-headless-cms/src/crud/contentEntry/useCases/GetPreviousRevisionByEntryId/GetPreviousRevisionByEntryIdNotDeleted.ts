import { IGetPreviousRevisionByEntryId } from "../../abstractions/index.js";
import { CmsEntryStorageOperationsGetPreviousRevisionParams, CmsModel } from "~/types/index.js";

export class GetPreviousRevisionByEntryIdNotDeleted implements IGetPreviousRevisionByEntryId {
    private getPreviousRevisionByEntryId: IGetPreviousRevisionByEntryId;

    constructor(getPreviousRevisionByEntryId: IGetPreviousRevisionByEntryId) {
        this.getPreviousRevisionByEntryId = getPreviousRevisionByEntryId;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsGetPreviousRevisionParams) {
        const entry = await this.getPreviousRevisionByEntryId.execute(model, params);

        if (!entry || entry.wbyDeleted) {
            return null;
        }

        return entry;
    }
}
