import { createAcoContext } from "~/createAcoContext.js";
import { createAcoGraphQL } from "~/createAcoGraphQL.js";

export { SEARCH_RECORD_MODEL_ID } from "./record/record.model.js";
export { FOLDER_MODEL_ID } from "./folder/folder.model.js";
export { FILTER_MODEL_ID } from "./filter/filter.model.js";
export * from "./apps/index.js";
export * from "./plugins/index.js";

export interface CreateAcoParams {
    useFolderLevelPermissions?: boolean;
}

export const createAco = (params: CreateAcoParams = {}) => {
    return [createAcoContext(params), ...createAcoGraphQL()];
};

export * from "./folder/createFolderModelModifier";
