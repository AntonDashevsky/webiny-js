import type { IGetRevisionById } from "../../abstractions/index.js";
import type {
    CmsEntryStorageOperations,
    CmsEntryStorageOperationsGetRevisionParams,
    CmsModel
} from "~/types/index.js";
import type { ITransformEntryCallable } from "~/utils/entryStorage.js";

export class GetRevisionById implements IGetRevisionById {
    private readonly operation: CmsEntryStorageOperations["getRevisionById"];
    private readonly transform: ITransformEntryCallable;

    public constructor(
        operation: CmsEntryStorageOperations["getRevisionById"],
        transform: ITransformEntryCallable
    ) {
        this.operation = operation;
        this.transform = transform;
    }

    public async execute(model: CmsModel, params: CmsEntryStorageOperationsGetRevisionParams) {
        const result = await this.operation(model, params);
        if (!result) {
            return null;
        }
        return await this.transform(model, result);
    }
}
