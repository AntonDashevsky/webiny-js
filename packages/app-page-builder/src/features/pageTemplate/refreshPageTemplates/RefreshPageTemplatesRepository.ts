import { makeAutoObservable, runInAction } from "mobx";
import type { IListPageTemplatesGateway } from "~/features/pageTemplate/listPageTemplates/IListPageTemplatesGateway";
import type { PbPageTemplateWithContent } from "~/types";
import type { ListCache } from "~/features/ListCache";
import type { IRefreshPageTemplatesRepository } from "~/features/pageTemplate/refreshPageTemplates/IRefreshPageTemplatesRepository";

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
