import { type Topic } from "@webiny/pubsub/types.js";
import {
    type CmsContext,
    type CmsEntryStorageOperations,
    type OnEntryAfterRestoreFromBinTopicParams,
    type OnEntryBeforeRestoreFromBinTopicParams,
    type OnEntryRestoreFromBinErrorTopicParams
} from "~/types/index.js";
import { type IGetLatestRevisionByEntryId } from "~/crud/contentEntry/abstractions/index.js";
import { type AccessControl } from "~/crud/AccessControl/AccessControl.js";
import { type SecurityIdentity } from "@webiny/api-security/types.js";
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
