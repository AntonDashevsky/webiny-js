import { type CmsModelField } from "@webiny/app-headless-cms-common/types/index.js";

export interface IGetFolderExtensionsFieldsUseCase {
    execute: () => {
        fields: CmsModelField[];
    };
}
