import type { Topic } from "@webiny/pubsub/types.js";
import { DuplicatePage } from "./DuplicatePage.js";
import { DuplicatePageWithEvents } from "./DuplicatePageWithEvents.js";
import type {
    OnPageAfterDuplicateTopicParams,
    OnPageBeforeDuplicateTopicParams,
    WbPagesStorageOperations
} from "~/context/pages/pages.types.js";

export interface DuplicatePageUseCasesTopics {
    onPageBeforeDuplicate: Topic<OnPageBeforeDuplicateTopicParams>;
    onPageAfterDuplicate: Topic<OnPageAfterDuplicateTopicParams>;
}

interface DuplicatePageUseCasesParams {
    createOperation: WbPagesStorageOperations["create"];
    getOperation: WbPagesStorageOperations["getById"];
    topics: DuplicatePageUseCasesTopics;
}

export const getDuplicatePageUseCase = (params: DuplicatePageUseCasesParams) => {
    const duplicatePage = new DuplicatePage(params.getOperation, params.createOperation);
    const duplicatePageUseCase = new DuplicatePageWithEvents(
        params.topics,
        params.getOperation,
        duplicatePage
    );

    return {
        duplicatePageUseCase
    };
};
