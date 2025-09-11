import type { Topic } from "@webiny/pubsub/types.js";
import { UpdatePage } from "./UpdatePage.js";
import { UpdatePageWithEvents } from "./UpdatePageWithEvents.js";
import type {
    OnPageAfterUpdateTopicParams,
    OnPageBeforeUpdateTopicParams,
    WbPagesStorageOperations
} from "~/context/pages/pages.types.js";

export interface UpdatePageUseCasesTopics {
    onPageBeforeUpdate: Topic<OnPageBeforeUpdateTopicParams>;
    onPageAfterUpdate: Topic<OnPageAfterUpdateTopicParams>;
}

interface UpdatePageUseCasesParams {
    updateOperation: WbPagesStorageOperations["update"];
    getOperation: WbPagesStorageOperations["getById"];
    topics: UpdatePageUseCasesTopics;
}

export const getUpdatePagerUseCase = (params: UpdatePageUseCasesParams) => {
    const updatePage = new UpdatePage(params.updateOperation);
    const updatePageUseCase = new UpdatePageWithEvents(
        params.topics,
        params.getOperation,
        updatePage
    );

    return {
        updatePageUseCase
    };
};
