import { createAcoContext } from "~/createAcoContext.js";
import { createAcoGraphQL } from "~/createAcoGraphQL.js";
import { type DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import { createAcoTasks } from "~/createAcoTasks.js";

export { SEARCH_RECORD_MODEL_ID } from "./record/record.model.js";
export { FOLDER_MODEL_ID } from "./folder/folder.model.js";
export { FILTER_MODEL_ID } from "./filter/filter.model.js";
export * from "./apps/index.js";
export * from "./plugins/index.js";

export interface CreateAcoParams {
    documentClient: DynamoDBDocument;
    useFolderLevelPermissions?: boolean;
}

export const createAco = (params: CreateAcoParams) => {
    return [createAcoContext(params), ...createAcoGraphQL(), ...createAcoTasks()];
};

export * from "./folder/createFolderModelModifier.js";
