import { parseIdentifier } from "@webiny/utils";
import type { CmsModel } from "@webiny/api-headless-cms/types";
import type { IProcessEntry } from "~/abstractions";
import type { HcmsBulkActionsContext } from "~/types";

class DeleteEntry implements IProcessEntry {
    private readonly context: HcmsBulkActionsContext;

    constructor(context: HcmsBulkActionsContext) {
        this.context = context;
    }

    async execute(model: CmsModel, id: string): Promise<void> {
        const { id: entryId } = parseIdentifier(id);
        await this.context.cms.deleteEntry(model, entryId, {
            permanently: true
        });
    }
}

export const createDeleteEntry = (context: HcmsBulkActionsContext) => {
    return new DeleteEntry(context);
};
