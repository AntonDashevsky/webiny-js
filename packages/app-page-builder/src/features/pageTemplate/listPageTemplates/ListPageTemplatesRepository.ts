import { makeAutoObservable, runInAction } from "mobx";
import { type IListPageTemplatesGateway } from "~/features/pageTemplate/listPageTemplates/IListPageTemplatesGateway.js";
import { type IListPageTemplatesRepository } from "~/features/pageTemplate/listPageTemplates/IListPageTemplatesRepository.js";
import { type PbPageTemplateWithContent } from "~/types.js";
import { type ListCache } from "~/features/ListCache.js";

export class ListPageTemplatesRepository implements IListPageTemplatesRepository {
    private loading: boolean;
    private loader: Promise<PbPageTemplateWithContent[]> | undefined = undefined;
    private gateway: IListPageTemplatesGateway;
    private cache: ListCache<PbPageTemplateWithContent>;

    constructor(gateway: IListPageTemplatesGateway, cache: ListCache<PbPageTemplateWithContent>) {
        this.gateway = gateway;
        this.cache = cache;
        this.loading = false;
        makeAutoObservable(this);
    }

    getLoading() {
        return this.loading;
    }

    getPageTemplates(): PbPageTemplateWithContent[] {
        return this.cache.getItems();
    }

    async execute() {
        if (this.cache.hasItems()) {
            return this.cache.getItems();
        }

        if (this.loader) {
            return this.loader;
        }

        this.loader = (async () => {
            this.loading = true;

            let pageTemplateDtos: PbPageTemplateWithContent[] = [];

            try {
                pageTemplateDtos = await this.gateway.execute();
            } catch (err) {
                console.error(err);
            } finally {
                runInAction(() => {
                    this.loading = false;
                });
            }

            runInAction(() => {
                this.cache.addItems(pageTemplateDtos);
            });

            this.loader = undefined;

            return pageTemplateDtos;
        })();

        return this.loader;
    }
}
