import type { IRestoreEntryFromBin } from "~/crud/contentEntry/abstractions/index.js";
import type { AccessControl } from "~/crud/AccessControl/AccessControl.js";
import type { CmsModel } from "~/types/index.js";

export class RestoreEntryFromBinSecure implements IRestoreEntryFromBin {
    private accessControl: AccessControl;
    private useCase: IRestoreEntryFromBin;

    constructor(accessControl: AccessControl, useCase: IRestoreEntryFromBin) {
        this.accessControl = accessControl;
        this.useCase = useCase;
    }

    async execute(model: CmsModel, id: string) {
        await this.accessControl.ensureCanAccessEntry({ model, rwd: "d" });
        return await this.useCase.execute(model, id);
    }
}
