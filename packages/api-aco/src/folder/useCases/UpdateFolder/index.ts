import type { Topic } from "@webiny/pubsub/types.js";
import type {
    AcoFolderStorageOperations,
    OnFolderAfterUpdateTopicParams,
    OnFolderBeforeUpdateTopicParams
} from "~/folder/folder.types.js";
import { UpdateFolder } from "./UpdateFolder.js";
import { UpdateFolderWithEvents } from "./UpdateFolderWithEvents.js";
import { UpdateFolderWithFolderLevelPermissions } from "./UpdateFolderWithFolderLevelPermissions.js";
import type { FolderLevelPermissions } from "~/flp/index.js";

export interface UpdateFolderUseCasesTopics {
    onFolderBeforeUpdate: Topic<OnFolderBeforeUpdateTopicParams>;
    onFolderAfterUpdate: Topic<OnFolderAfterUpdateTopicParams>;
}

interface UpdateFolderUseCasesParams {
    updateOperation: AcoFolderStorageOperations["updateFolder"];
    getOperation: AcoFolderStorageOperations["getFolder"];
    folderLevelPermissions: FolderLevelPermissions;
    topics: UpdateFolderUseCasesTopics;
}

export const getUpdateFolderUseCase = (params: UpdateFolderUseCasesParams) => {
    const updateFolder = new UpdateFolder(params.updateOperation);
    const updateFolderUseCaseWithEvents = new UpdateFolderWithEvents(
        params.topics,
        params.getOperation,
        updateFolder
    );
    const updateFolderUseCase = new UpdateFolderWithFolderLevelPermissions(
        params.folderLevelPermissions,
        params.getOperation,
        updateFolderUseCaseWithEvents
    );

    return {
        updateFolderUseCase
    };
};
