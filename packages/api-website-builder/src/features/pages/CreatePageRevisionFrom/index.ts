import type { Topic } from "@webiny/pubsub/types.js";
import { CreatePageRevisionFrom } from "./CreatePageRevisionFrom.js";
import { CreatePageRevisionFromWithEvents } from "./CreatePageRevisionFromWithEvents.js";
import type {
    OnPageAfterCreateRevisionFromTopicParams,
    OnPageBeforeCreateRevisionFromTopicParams,
    WbPagesStorageOperations
} from "~/context/pages/pages.types.js";

export interface CreatePageRevisionFromUseCasesTopics {
    onPageBeforeCreateRevisionFrom: Topic<OnPageBeforeCreateRevisionFromTopicParams>;
    onPageAfterCreateRevisionFrom: Topic<OnPageAfterCreateRevisionFromTopicParams>;
}

interface CreatePageRevisionFromUseCasesParams {
    createRevisionFromOperation: WbPagesStorageOperations["createRevisionFrom"];
    getOperation: WbPagesStorageOperations["getById"];
    topics: CreatePageRevisionFromUseCasesTopics;
}

export const getCreatePageRevisionFromUseCase = (params: CreatePageRevisionFromUseCasesParams) => {
    const createPageRevisionFrom = new CreatePageRevisionFrom(params.createRevisionFromOperation);
    const createPageRevisionFromUseCase = new CreatePageRevisionFromWithEvents(
        params.topics,
        params.getOperation,
        createPageRevisionFrom
    );

    return {
        createPageRevisionFromUseCase
    };
};
