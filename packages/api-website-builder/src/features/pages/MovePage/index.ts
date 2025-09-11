import type { Topic } from "@webiny/pubsub/types.js";
import { MovePage } from "./MovePage.js";
import { MovePageWithEvents } from "./MovePageWithEvents.js";
import type {
    OnPageAfterMoveTopicParams,
    OnPageBeforeMoveTopicParams,
    WbPagesStorageOperations
} from "~/context/pages/pages.types.js";

export interface MovePageUseCasesTopics {
    onPageBeforeMove: Topic<OnPageBeforeMoveTopicParams>;
    onPageAfterMove: Topic<OnPageAfterMoveTopicParams>;
}

interface MovePageUseCasesParams {
    moveOperation: WbPagesStorageOperations["move"];
    getOperation: WbPagesStorageOperations["getById"];
    topics: MovePageUseCasesTopics;
}

export const getMovePageUseCase = (params: MovePageUseCasesParams) => {
    const movePage = new MovePage(params.moveOperation);
    const movePageUseCase = new MovePageWithEvents(params.topics, params.getOperation, movePage);

    return {
        movePageUseCase
    };
};
