import { makeAutoObservable, runInAction } from "mobx";
import { IListPageTemplatesGateway } from "~/features/pageTemplate/listPageTemplates/IListPageTemplatesGateway.js";
import { PbPageTemplateWithContent } from "~/types.js";
import { ListCache } from "~/features/ListCache.js";
import { IRefreshPageTemplatesRepository } from "~/features/pageTemplate/refreshPageTemplates/IRefreshPageTemplatesRepository.js";

export class RefreshPageTemplatesRepository implements IRefreshPageTemplatesRepository {
    private loader: Promise<void> | undefined = undefined;
    private gateway: IListPageTemplatesGateway;
    private cache: ListCache<PbPageTemplateWithContent>;

    constructor(gateway: IListPageTemplatesGateway, cache: ListCache<PbPageTemplateWithContent>) {
        this.gateway = gateway;
        this.cache = cache;
        makeAutoObservable(this);
    }

    async execute() {
        if (this.loader) {
            return this.loader;
        }

        this.loader = (async () => {
            let pageTemplateDtos: PbPageTemplateWithContent[] = [];

            try {
                pageTemplateDtos = await this.gateway.execute();
            } catch (err) {
                console.error(err);
            }

            runInAction(() => {
                this.cache.clear();
                this.cache.addItems(pageTemplateDtos);
            });

            this.loader = undefined;
        })();

        return this.loader;
    }
}
