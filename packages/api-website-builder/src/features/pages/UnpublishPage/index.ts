import type { Topic } from "@webiny/pubsub/types.js";
import { UnpublishPage } from "./UnpublishPage.js";
import { UnpublishPageWithEvents } from "./UnpublishPageWithEvents.js";
import type {
    OnPageAfterUnpublishTopicParams,
    OnPageBeforeUnpublishTopicParams,
    WbPagesStorageOperations
} from "~/context/pages/pages.types.js";

export interface UnpublishPageUseCasesTopics {
    onPageBeforeUnpublish: Topic<OnPageBeforeUnpublishTopicParams>;
    onPageAfterUnpublish: Topic<OnPageAfterUnpublishTopicParams>;
}

interface UnpublishPageUseCasesParams {
    unpublishOperation: WbPagesStorageOperations["unpublish"];
    getOperation: WbPagesStorageOperations["getById"];
    topics: UnpublishPageUseCasesTopics;
}

export const getUnpublishPageUseCase = (params: UnpublishPageUseCasesParams) => {
    const unpublishPage = new UnpublishPage(params.unpublishOperation);
    const unpublishPageUseCase = new UnpublishPageWithEvents(
        params.topics,
        params.getOperation,
        unpublishPage
    );

    return {
        unpublishPageUseCase
    };
};
