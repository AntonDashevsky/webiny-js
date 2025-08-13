import { isHeadlessCmsReady } from "@webiny/api-headless-cms";
import type { WebsiteBuilderContext } from "~/context/types";
import type { WbPageCrud } from "./pages/pages.types";
import type { WbRedirectCrud } from "./redirects/redirects.types";
import { PagesContext } from "./pages/pages.context";
import { RedirectsContext } from "~/context/redirects/redirects.context";
import { InvalidateRedirectsCache } from "~/features/redirects";

export class WebsiteBuilder {
    private readonly context: WebsiteBuilderContext;
    private pagesContext: WbPageCrud | undefined;
    private redirectsContext: WbRedirectCrud | undefined;

    private constructor(context: WebsiteBuilderContext) {
        this.context = context;
    }

    private async init() {
        this.pagesContext = await PagesContext.create(this.context);
        this.redirectsContext = await RedirectsContext.create(this.context);
        this.invalidateCacheOnRedirectEvents();
    }

    private invalidateCacheOnRedirectEvents() {
        const invalidateRedirectsCache = new InvalidateRedirectsCache(this.context.tasks);

        this.redirects.onRedirectAfterCreate.subscribe(async ({ redirect }) => {
            if (redirect.isEnabled) {
                await invalidateRedirectsCache.execute();
            }
        });

        this.redirects.onRedirectAfterUpdate.subscribe(async ({ redirect, original }) => {
            if (
                redirect.redirectFrom !== original.redirectFrom ||
                redirect.redirectTo !== original.redirectTo ||
                redirect.isEnabled !== original.isEnabled
            ) {
                await invalidateRedirectsCache.execute();
            }
        });

        this.redirects.onRedirectAfterDelete.subscribe(async ({ redirect }) => {
            if (redirect.isEnabled) {
                await invalidateRedirectsCache.execute();
            }
        });
    }

    get pages() {
        return this.pagesContext!;
    }

    get redirects() {
        return this.redirectsContext!;
    }

    static async create(context: WebsiteBuilderContext): Promise<WebsiteBuilder> {
        const websiteBuilder = new WebsiteBuilder(context);

        if (!(await isHeadlessCmsReady(context))) {
            return websiteBuilder;
        }

        await websiteBuilder.init();
        return websiteBuilder;
    }
}
