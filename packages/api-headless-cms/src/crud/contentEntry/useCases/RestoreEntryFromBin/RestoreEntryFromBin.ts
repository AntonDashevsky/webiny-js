import { NotFoundError } from "@webiny/handler-graphql";
import type {
    IGetLatestRevisionByEntryId,
    IRestoreEntryFromBin,
    IRestoreEntryFromBinOperation
} from "~/crud/contentEntry/abstractions";
import type { TransformEntryRestoreFromBin } from "./TransformEntryRestoreFromBin";
import type { CmsModel } from "~/types";
import { parseIdentifier } from "@webiny/utils";

export class RestoreEntryFromBin implements IRestoreEntryFromBin {
    private getEntry: IGetLatestRevisionByEntryId;
    private transformEntry: TransformEntryRestoreFromBin;
    private restoreEntry: IRestoreEntryFromBinOperation;

    constructor(
        getEntry: IGetLatestRevisionByEntryId,
        transformEntry: TransformEntryRestoreFromBin,
        restoreEntry: IRestoreEntryFromBinOperation
    ) {
        this.getEntry = getEntry;
        this.transformEntry = transformEntry;
        this.restoreEntry = restoreEntry;
    }

    async execute(model: CmsModel, id: string) {
        const { id: entryId } = parseIdentifier(id);
        const entryToRestore = await this.getEntry.execute(model, { id: entryId });

        if (!entryToRestore) {
            throw new NotFoundError(`Entry "${id}" was not found!`);
        }

        const { entry, storageEntry } = await this.transformEntry.execute(model, entryToRestore);

        return await this.restoreEntry.execute(model, { entry, storageEntry });
    }
}
