import { Topic } from "@webiny/pubsub/types.js";
import {
    CmsContext,
    CmsEntryStorageOperations,
    OnEntryAfterRestoreFromBinTopicParams,
    OnEntryBeforeRestoreFromBinTopicParams,
    OnEntryRestoreFromBinErrorTopicParams
} from "~/types/index.js";
import { IGetLatestRevisionByEntryId } from "~/crud/contentEntry/abstractions/index.js";
import { AccessControl } from "~/crud/AccessControl/AccessControl.js";
import { SecurityIdentity } from "@webiny/api-security/types.js";
import { RestoreEntryFromBinOperation } from "./RestoreEntryFromBinOperation.js";
import { RestoreEntryFromBinOperationWithEvents } from "./RestoreEntryFromBinOperationWithEvents.js";
import { TransformEntryRestoreFromBin } from "./TransformEntryRestoreFromBin.js";
import { RestoreEntryFromBin } from "./RestoreEntryFromBin.js";
import { RestoreEntryFromBinSecure } from "./RestoreEntryFromBinSecure.js";

export interface RestoreEntryFromBinUseCasesTopics {
    onEntryBeforeRestoreFromBin: Topic<OnEntryBeforeRestoreFromBinTopicParams>;
    onEntryAfterRestoreFromBin: Topic<OnEntryAfterRestoreFromBinTopicParams>;
    onEntryRestoreFromBinError: Topic<OnEntryRestoreFromBinErrorTopicParams>;
}

interface RestoreEntryFromBinUseCasesParams {
    restoreOperation: CmsEntryStorageOperations["restoreFromBin"];
    getEntry: IGetLatestRevisionByEntryId;
    accessControl: AccessControl;
    topics: RestoreEntryFromBinUseCasesTopics;
    context: CmsContext;
    getIdentity: () => SecurityIdentity;
}

export const restoreEntryFromBinUseCases = (params: RestoreEntryFromBinUseCasesParams) => {
    const restoreEntryOperation = new RestoreEntryFromBinOperation(params.restoreOperation);
    const restoreEntryOperationWithEvents = new RestoreEntryFromBinOperationWithEvents(
        params.topics,
        restoreEntryOperation
    );
    const restoreTransform = new TransformEntryRestoreFromBin(params.context, params.getIdentity);
    const restoreEntry = new RestoreEntryFromBin(
        params.getEntry,
        restoreTransform,
        restoreEntryOperationWithEvents
    );
    const restoreEntrySecure = new RestoreEntryFromBinSecure(params.accessControl, restoreEntry);

    return {
        restoreEntryFromBinUseCase: restoreEntrySecure
    };
};
