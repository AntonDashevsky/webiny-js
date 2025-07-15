import { WebinyError } from "@webiny/error";
import type { PublishPageUseCasesTopics } from "./index";
import type { PublishWbPageParams, WbPagesStorageOperations } from "~/page/page.types";
import type { IPublishPage } from "~/page/useCases/PublishPage/IPublishPage";

export class PublishPageWithEvents implements IPublishPage {
    private topics: PublishPageUseCasesTopics;
    private readonly getOperation: WbPagesStorageOperations["getById"];
    private readonly decoretee: IPublishPage;

    constructor(
        topics: PublishPageUseCasesTopics,
        getOperation: WbPagesStorageOperations["getById"],
        decoretee: IPublishPage
    ) {
        this.topics = topics;
        this.getOperation = getOperation;
        this.decoretee = decoretee;
    }

    async execute(params: PublishWbPageParams) {
        const page = await this.getOperation(params.id);

        if (!page) {
            throw new WebinyError(
                `Page with id ${params.id} not found`,
                "PUBLISH_PAGE_WITH_EVENTS_ERROR"
            );
        }

        await this.topics.onWebsiteBuilderPageBeforePublish.publish({ page });
        const publishedPage = await this.decoretee.execute(params);
        await this.topics.onWebsiteBuilderPageAfterPublish.publish({ page: publishedPage });

        return publishedPage;
    }
}
