import type { Topic } from "@webiny/pubsub/types.js";
import {
    type AcoFolderStorageOperations,
    type OnFolderAfterCreateTopicParams,
    type OnFolderBeforeCreateTopicParams
} from "~/folder/folder.types.js";
import { CreateFolder } from "./CreateFolder.js";
import { CreateFolderWithEvents } from "./CreateFolderWithEvents.js";
import { CreateFolderWithFolderLevelPermissions } from "./CreateFolderWithFolderLevelPermissions.js";
import type { FolderLevelPermissions } from "~/flp/index.js";

export interface CreateFolderUseCasesTopics {
    onFolderBeforeCreate: Topic<OnFolderBeforeCreateTopicParams>;
    onFolderAfterCreate: Topic<OnFolderAfterCreateTopicParams>;
}

interface CreateFolderUseCasesParams {
    createOperation: AcoFolderStorageOperations["createFolder"];
    folderLevelPermissions: FolderLevelPermissions;
    topics: CreateFolderUseCasesTopics;
}

export const getCreateFolderUseCases = (params: CreateFolderUseCasesParams) => {
    const createFolder = new CreateFolder(params.createOperation);
    const createFolderUseCaseWithEvents = new CreateFolderWithEvents(params.topics, createFolder);
    const createFolderUseCase = new CreateFolderWithFolderLevelPermissions(
        params.folderLevelPermissions,
        createFolderUseCaseWithEvents
    );

    return {
        createFolderUseCase
    };
};
