import type { Topic } from "@webiny/pubsub/types.js";
import { UpdateRedirect } from "./UpdateRedirect.js";
import { UpdateRedirectWithEvents } from "./UpdateRedirectWithEvents.js";
import type {
    OnRedirectAfterUpdateTopicParams,
    OnRedirectBeforeUpdateTopicParams,
    WbRedirectsStorageOperations
} from "~/context/redirects/redirects.types.js";

export interface UpdateRedirectUseCasesTopics {
    onRedirectBeforeUpdate: Topic<OnRedirectBeforeUpdateTopicParams>;
    onRedirectAfterUpdate: Topic<OnRedirectAfterUpdateTopicParams>;
}

interface UpdateRedirectUseCasesParams {
    updateOperation: WbRedirectsStorageOperations["update"];
    getOperation: WbRedirectsStorageOperations["getById"];
    topics: UpdateRedirectUseCasesTopics;
}

export const getUpdateRedirectUseCase = (params: UpdateRedirectUseCasesParams) => {
    const updateRedirect = new UpdateRedirect(params.updateOperation);
    const updateRedirectUseCase = new UpdateRedirectWithEvents(
        params.topics,
        params.getOperation,
        updateRedirect
    );

    return {
        updateRedirectUseCase
    };
};
