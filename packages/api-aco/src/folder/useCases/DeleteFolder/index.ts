import { type Topic } from "@webiny/pubsub/types.js";
import {
    type AcoFolderStorageOperations,
    type OnFolderAfterDeleteTopicParams,
    type OnFolderBeforeDeleteTopicParams
} from "~/folder/folder.types.js";
import { DeleteFolder } from "./DeleteFolder.js";
import { DeleteFolderWithEvents } from "./DeleteFolderWithEvents.js";
import { DeleteFolderWithFolderLevelPermissions } from "./DeleteFolderWithFolderLevelPermissions.js";
import { type FolderLevelPermissions } from "~/flp/index.js";

export interface DeleteFolderUseCasesTopics {
    onFolderBeforeDelete: Topic<OnFolderBeforeDeleteTopicParams>;
    onFolderAfterDelete: Topic<OnFolderAfterDeleteTopicParams>;
}

interface DeleteFolderUseCasesParams {
    deleteOperation: AcoFolderStorageOperations["deleteFolder"];
    getOperation: AcoFolderStorageOperations["getFolder"];
    folderLevelPermissions: FolderLevelPermissions;
    topics: DeleteFolderUseCasesTopics;
}

export const getDeleteFolderUseCases = (params: DeleteFolderUseCasesParams) => {
    const deleteFolder = new DeleteFolder(params.deleteOperation);
    const deleteFolderUseCaseWithEvents = new DeleteFolderWithEvents(
        params.topics,
        params.getOperation,
        deleteFolder
    );
    const deleteFolderUseCase = new DeleteFolderWithFolderLevelPermissions(
        params.folderLevelPermissions,
        deleteFolderUseCaseWithEvents
    );

    return {
        deleteFolderUseCase
    };
};
