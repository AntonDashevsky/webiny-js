import type { Topic } from "@webiny/pubsub/types.js";
import { DeletePage } from "./DeletePage.js";
import { DeletePageWithEvents } from "./DeletePageWithEvents.js";
import type {
    OnPageAfterDeleteTopicParams,
    OnPageBeforeDeleteTopicParams,
    WbPagesStorageOperations
} from "~/context/pages/pages.types.js";

export interface DeletePageUseCasesTopics {
    onPageBeforeDelete: Topic<OnPageBeforeDeleteTopicParams>;
    onPageAfterDelete: Topic<OnPageAfterDeleteTopicParams>;
}

interface DeletePageUseCasesParams {
    deleteOperation: WbPagesStorageOperations["delete"];
    getOperation: WbPagesStorageOperations["getById"];
    topics: DeletePageUseCasesTopics;
}

export const getDeletePageUseCase = (params: DeletePageUseCasesParams) => {
    const deletePage = new DeletePage(params.deleteOperation);
    const deletePageUseCase = new DeletePageWithEvents(
        params.topics,
        params.getOperation,
        deletePage
    );

    return {
        deletePageUseCase
    };
};
