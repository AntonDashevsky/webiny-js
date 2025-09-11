import type { Topic } from "@webiny/pubsub/types.js";
import { CreatePage } from "./CreatePage.js";
import { CreatePageWithEvents } from "./CreatePageWithEvents.js";
import type {
    OnPageAfterCreateTopicParams,
    OnPageBeforeCreateTopicParams,
    WbPagesStorageOperations
} from "~/context/pages/pages.types.js";

export interface CreatePageUseCasesTopics {
    onPageBeforeCreate: Topic<OnPageBeforeCreateTopicParams>;
    onPageAfterCreate: Topic<OnPageAfterCreateTopicParams>;
}

interface CreatePageUseCasesParams {
    createOperation: WbPagesStorageOperations["create"];
    topics: CreatePageUseCasesTopics;
}

export const getCreatePageUseCase = (params: CreatePageUseCasesParams) => {
    const createPage = new CreatePage(params.createOperation);
    const createPageUseCase = new CreatePageWithEvents(params.topics, createPage);

    return {
        createPageUseCase
    };
};
