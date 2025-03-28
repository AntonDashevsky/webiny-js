import type { IGetFolderExtensionsFieldsRepository } from "./IGetFolderExtensionsFieldsRepository.js";
import type { CmsModel } from "@webiny/app-headless-cms-common/types/index.js";

export class GetFolderExtensionsFieldsRepository implements IGetFolderExtensionsFieldsRepository {
    private model: CmsModel;

    constructor(model: CmsModel) {
        this.model = model;
    }

    execute() {
        return this.model.fields.find(f => f.fieldId === "extensions") || undefined;
    }
}
