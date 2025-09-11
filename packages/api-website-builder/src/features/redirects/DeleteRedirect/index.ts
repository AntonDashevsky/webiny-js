import type { Topic } from "@webiny/pubsub/types.js";
import { DeleteRedirect } from "./DeleteRedirect.js";
import { DeleteRedirectWithEvents } from "./DeleteRedirectWithEvents.js";
import type {
    OnRedirectAfterDeleteTopicParams,
    OnRedirectBeforeDeleteTopicParams,
    WbRedirectsStorageOperations
} from "~/context/redirects/redirects.types.js";

export interface DeleteRedirectUseCasesTopics {
    onRedirectBeforeDelete: Topic<OnRedirectBeforeDeleteTopicParams>;
    onRedirectAfterDelete: Topic<OnRedirectAfterDeleteTopicParams>;
}

interface DeleteRedirectUseCasesParams {
    deleteOperation: WbRedirectsStorageOperations["delete"];
    getOperation: WbRedirectsStorageOperations["getById"];
    topics: DeleteRedirectUseCasesTopics;
}

export const getDeleteRedirectUseCase = (params: DeleteRedirectUseCasesParams) => {
    const deleteRedirect = new DeleteRedirect(params.deleteOperation);
    const deleteRedirectUseCase = new DeleteRedirectWithEvents(
        params.topics,
        params.getOperation,
        deleteRedirect
    );

    return {
        deleteRedirectUseCase
    };
};
