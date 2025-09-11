import type { Topic } from "@webiny/pubsub/types.js";
import { MoveRedirect } from "./MoveRedirect.js";
import { MoveRedirectWithEvents } from "./MoveRedirectWithEvents.js";
import type {
    OnRedirectAfterMoveTopicParams,
    OnRedirectBeforeMoveTopicParams,
    WbRedirectsStorageOperations
} from "~/context/redirects/redirects.types.js";

export interface MoveRedirectUseCasesTopics {
    onRedirectBeforeMove: Topic<OnRedirectBeforeMoveTopicParams>;
    onRedirectAfterMove: Topic<OnRedirectAfterMoveTopicParams>;
}

interface MoveRedirectUseCasesParams {
    moveOperation: WbRedirectsStorageOperations["move"];
    getOperation: WbRedirectsStorageOperations["getById"];
    topics: MoveRedirectUseCasesTopics;
}

export const getMoveRedirectUseCase = (params: MoveRedirectUseCasesParams) => {
    const moveRedirect = new MoveRedirect(params.moveOperation);
    const moveRedirectUseCase = new MoveRedirectWithEvents(
        params.topics,
        params.getOperation,
        moveRedirect
    );

    return {
        moveRedirectUseCase
    };
};
