import { type IDeleteEntry } from "~/crud/contentEntry/abstractions/index.js";
import { type AccessControl } from "~/crud/AccessControl/AccessControl.js";
import { type CmsDeleteEntryOptions, type CmsModel } from "~/types/index.js";

export class DeleteEntrySecure implements IDeleteEntry {
    private accessControl: AccessControl;
    private useCase: IDeleteEntry;

    constructor(accessControl: AccessControl, useCase: IDeleteEntry) {
        this.accessControl = accessControl;
        this.useCase = useCase;
    }

    async execute(model: CmsModel, id: string, options: CmsDeleteEntryOptions) {
        await this.accessControl.ensureCanAccessEntry({ model, rwd: "d" });
        await this.useCase.execute(model, id, options);
    }
}
