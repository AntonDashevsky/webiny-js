import { CmsContext, HeadlessCms } from "@webiny/api-headless-cms/types/index.js";
import { Security } from "@webiny/api-security/types.js";

import { createFilterOperations } from "~/filter/filter.so.js";
import { createFolderOperations } from "~/folder/folder.so.js";
import { createSearchRecordOperations } from "~/record/record.so.js";
import { createAcoModels } from "~/createAcoModels.js";

import { AcoStorageOperations } from "~/types.js";

export interface CreateAcoStorageOperationsParams {
    cms: HeadlessCms;
    security: Security;
    getCmsContext: () => CmsContext;
}

export const createAcoStorageOperations = async (
    params: CreateAcoStorageOperationsParams
): Promise<AcoStorageOperations> => {
    const context = params.getCmsContext();

    await createAcoModels(context);

    return {
        ...createFolderOperations(params),
        ...createSearchRecordOperations(params),
        ...createFilterOperations(params)
    };
};
