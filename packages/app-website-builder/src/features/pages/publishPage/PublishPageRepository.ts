import type { IPublishPageRepository } from "~/features/pages/publishPage/IPublishPageRepository.js";
import type { IPublishPageGateway } from "~/features/pages/publishPage/IPublishPageGateway.js";
import { type IListCache, Page } from "~/domain/Page/index.js";

export class PublishPageRepository implements IPublishPageRepository {
    private listCache: IListCache<Page>;
    private detailsCache: IListCache<Page>;
    private gateway: IPublishPageGateway;

    constructor(
        listCache: IListCache<Page>,
        detailsCache: IListCache<Page>,
        gateway: IPublishPageGateway
    ) {
        this.detailsCache = detailsCache;
        this.listCache = listCache;
        this.gateway = gateway;
    }

    async execute(page: Page) {
        const result = await this.gateway.execute(page.id);
        const newPage = Page.create(result);

        this.listCache.updateItems(existingPage => {
            if (existingPage.id === page.id) {
                return newPage;
            }

            return existingPage;
        });

        this.detailsCache.updateItems(existingPage => {
            if (existingPage.id === page.id) {
                return newPage;
            }

            return existingPage;
        });
    }
}
