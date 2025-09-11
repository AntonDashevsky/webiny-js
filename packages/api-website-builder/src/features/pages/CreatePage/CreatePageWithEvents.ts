import type { ICreatePage } from "./ICreatePage.js";
import type { CreatePageUseCasesTopics } from "./index.js";
import type { CreateWbPageData } from "~/context/pages/pages.types.js";

export class CreatePageWithEvents implements ICreatePage {
    private topics: CreatePageUseCasesTopics;
    private readonly decoretee: ICreatePage;

    constructor(topics: CreatePageUseCasesTopics, decoretee: ICreatePage) {
        this.topics = topics;
        this.decoretee = decoretee;
    }

    async execute(data: CreateWbPageData) {
        await this.topics.onPageBeforeCreate.publish({ input: data });
        const page = await this.decoretee.execute(data);
        await this.topics.onPageAfterCreate.publish({ page });
        return page;
    }
}
