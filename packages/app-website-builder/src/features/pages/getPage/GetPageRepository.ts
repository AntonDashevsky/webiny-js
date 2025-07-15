import { IGetPageRepository } from "./IGetPageRepository.js";
import { IGetPageGateway } from "./IGetPageGateway.js";
import { type IListCache, Page } from "~/domain/Page/index.js";

export class GetPageRepository implements IGetPageRepository {
    private cache: IListCache<Page>;
    private gateway: IGetPageGateway;

    constructor(cache: IListCache<Page>, gateway: IGetPageGateway) {
        this.cache = cache;
        this.gateway = gateway;
    }

    async execute(id: string) {
        const existingPage = this.cache.getItem(page => page.id === id);
        if (existingPage) {
            return existingPage;
        }

        const response = await this.gateway.execute(id);
        const page = Page.create(response);
        this.cache.addItems([page]);
        return page;
    }
}
