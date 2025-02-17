import { parseIdentifier } from "@webiny/utils";
import { CmsModel } from "@webiny/api-headless-cms/types/index.js";
import { IProcessEntry } from "~/abstractions/index.js";
import { HcmsBulkActionsContext } from "~/types.js";

class RestoreEntryFromTrash implements IProcessEntry {
    private readonly context: HcmsBulkActionsContext;

    constructor(context: HcmsBulkActionsContext) {
        this.context = context;
    }

    async execute(model: CmsModel, id: string): Promise<void> {
        const { id: entryId } = parseIdentifier(id);
        await this.context.cms.restoreEntryFromBin(model, entryId);
    }
}

export const createRestoreEntryFromTrash = (context: HcmsBulkActionsContext) => {
    return new RestoreEntryFromTrash(context);
};
