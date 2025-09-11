import { WebinyError } from "@webiny/error";
import type { IDeleteRedirect } from "./IDeleteRedirect.js";
import type {
    DeleteWbRedirectParams,
    WbRedirectsStorageOperations
} from "~/context/redirects/redirects.types.js";
import type { DeleteRedirectUseCasesTopics } from "~/features/redirects/index.js";

export class DeleteRedirectWithEvents implements IDeleteRedirect {
    private topics: DeleteRedirectUseCasesTopics;
    private readonly getOperation: WbRedirectsStorageOperations["getById"];
    private readonly decoretee: IDeleteRedirect;

    constructor(
        topics: DeleteRedirectUseCasesTopics,
        getOperation: WbRedirectsStorageOperations["getById"],
        decoretee: IDeleteRedirect
    ) {
        this.topics = topics;
        this.getOperation = getOperation;
        this.decoretee = decoretee;
    }

    async execute(params: DeleteWbRedirectParams) {
        const redirect = await this.getOperation(params.id);

        if (!redirect) {
            throw new WebinyError(
                `Redirect with id ${params.id} not found`,
                "DELETE_REDIRECT_WITH_EVENTS_ERROR"
            );
        }

        await this.topics.onRedirectBeforeDelete.publish({ redirect });
        await this.decoretee.execute(params);
        await this.topics.onRedirectAfterDelete.publish({ redirect });
    }
}
