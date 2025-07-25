import { WebsiteBuilderContext } from "~/context/types";
import { WbPageCrud } from "~/context/pages/page.types";
import { BaseContext } from "~/context/BaseContext";
import { createPageModel, PAGE_MODEL_ID } from "~/context/pages/page.model";
import { CmsModelPlugin } from "@webiny/api-headless-cms";
import { CmsPagesStorage } from "~/context/pages/CmsPagesStorage";
import { createPagesCrud } from "~/context/pages/page.crud";

export class PagesContext extends BaseContext {
    private constructor(context: WebsiteBuilderContext) {
        super(context);
    }

    private async init() {
        const storageOperations = await this.context.security.withoutAuthorization(() => {
            return this.setupPageCmsStorageOperations();
        });

            return createPagesCrud({
                storageOperations,
                getTenantId: this.getTenantId.bind(this),
                getLocaleCode: this.getLocaleCode.bind(this),
                getIdentity: this.getIdentity.bind(this),
                getPermissions: this.getPermissions.bind(this)
            })
    }

    private async setupPageCmsStorageOperations() {
        // This registers code plugins (model group, models)
        const pageModelDefinition = createPageModel();

        // Finally, register all plugins
        this.context.plugins.register([new CmsModelPlugin(pageModelDefinition)]);

        // Now load the page model registered in the previous step
        const pageModel = await this.getModel(PAGE_MODEL_ID);

        // Overwrite the original `pages` storage ops
        return await CmsPagesStorage.create({
            pageModel,
            cms: this.context.cms,
            plugins: this.context.plugins
        });
    }

    static async create(context: WebsiteBuilderContext): Promise<WbPageCrud> {
        const pagesContext = new PagesContext(context);
        return pagesContext.init();
    }
}
