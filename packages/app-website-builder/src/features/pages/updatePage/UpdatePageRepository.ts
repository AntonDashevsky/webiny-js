import { IUpdatePageRepository } from "./IUpdatePageRepository.js";
import { IUpdatePageGateway } from "./IUpdatePageGateway.js";
import { PageDto } from "./PageDto.js";
import { type IListCache, Page } from "~/domain/Page/index.js";

export class UpdatePageRepository implements IUpdatePageRepository {
    private listCache: IListCache<Page>;
    private gateway: IUpdatePageGateway;
    private detailsCache: IListCache<Page>;

    constructor(
        listCache: IListCache<Page>,
        detailsCache: IListCache<Page>,
        gateway: IUpdatePageGateway
    ) {
        this.detailsCache = detailsCache;
        this.listCache = listCache;
        this.gateway = gateway;
    }

    async execute(page: Page) {
        const dto: PageDto = {
            id: page.id,
            properties: page.properties,
            metadata: page.metadata,
            elements: page.elements,
            bindings: page.bindings,
            extensions: page.extensions
        };

        const result = await this.gateway.execute(dto);

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
