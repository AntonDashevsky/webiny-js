import type { IGetPublishedRevisionByEntryId } from "../../abstractions/index.js";
import type {
    CmsEntryStorageOperationsGetPublishedRevisionParams,
    CmsModel
} from "~/types/index.js";

export class GetPublishedRevisionByEntryIdNotDeleted implements IGetPublishedRevisionByEntryId {
    private getPublishedRevisionByEntryId: IGetPublishedRevisionByEntryId;

    constructor(getPublishedRevisionByEntryId: IGetPublishedRevisionByEntryId) {
        this.getPublishedRevisionByEntryId = getPublishedRevisionByEntryId;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsGetPublishedRevisionParams) {
        const entry = await this.getPublishedRevisionByEntryId.execute(model, params);

        if (!entry || entry.wbyDeleted) {
            return null;
        }

        return entry;
    }
}
