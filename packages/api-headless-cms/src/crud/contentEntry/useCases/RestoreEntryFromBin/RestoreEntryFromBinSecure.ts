import type { IRestoreEntryFromBin } from "~/crud/contentEntry/abstractions";
import type { AccessControl } from "~/crud/AccessControl/AccessControl";
import type { CmsModel } from "~/types";

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
