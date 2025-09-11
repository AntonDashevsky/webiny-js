import type { IUnpublishPageRepository } from "~/features/pages/unpublishPage/IUnpublishPageRepository.js";
import type { IUnpublishPageGateway } from "~/features/pages/unpublishPage/IUnpublishPageGateway.js";
import { type IListCache, Page } from "~/domain/Page/index.js";

export class UnpublishPageRepository implements IUnpublishPageRepository {
    private gateway: IUnpublishPageGateway;
    private detailsCache: IListCache<Page>;
    private listCache: IListCache<Page>;

    constructor(
        listCache: IListCache<Page>,
        detailsCache: IListCache<Page>,
        gateway: IUnpublishPageGateway
    ) {
        this.detailsCache = detailsCache;
        this.listCache = listCache;
        this.gateway = gateway;
    }

    async execute(page: Page) {
        const result = await this.gateway.execute(page.id);

        this.listCache.updateItems(existingPage => {
            if (existingPage.id === page.id) {
                return Page.create(result);
            }

            return existingPage;
        });

        this.detailsCache.updateItems(existingPage => {
            if (existingPage.id === page.id) {
                return Page.create({
                    ...result,
                    elements: page.elements,
                    bindings: page.bindings
                });
            }

            return existingPage;
        });
    }
}
