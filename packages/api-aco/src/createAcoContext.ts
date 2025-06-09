import WebinyError from "@webiny/error";
import { ContextPlugin } from "@webiny/api";
import { type I18NLocale } from "@webiny/api-i18n/types.js";
import { type Tenant } from "@webiny/api-tenancy/types.js";
import { isHeadlessCmsReady } from "@webiny/api-headless-cms";
import { type DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";
import { createAcoHooks } from "~/createAcoHooks.js";
import { createAcoStorageOperations } from "~/createAcoStorageOperations.js";
import { type AcoContext, type CreateAcoParams, type IAcoAppRegisterParams } from "~/types.js";
import { createFolderCrudMethods } from "~/folder/folder.crud.js";
import { createSearchRecordCrudMethods } from "~/record/record.crud.js";
import { AcoApps } from "./apps/index.js";
import { SEARCH_RECORD_MODEL_ID } from "~/record/record.model.js";
import { AcoAppRegisterPlugin } from "~/plugins/index.js";
import { CmsEntriesCrudDecorators } from "~/utils/decorators/CmsEntriesCrudDecorators.js";
import { createFilterCrudMethods } from "~/filter/filter.crud.js";
import { createFlpCrudMethods, FolderLevelPermissions } from "~/flp/index.js";

interface CreateAcoContextParams {
    useFolderLevelPermissions?: boolean;
    documentClient: DynamoDBDocument;
}

const setupAcoContext = async (
    context: AcoContext,
    setupAcoContextParams: CreateAcoContextParams
): Promise<void> => {
    const { tenancy, security, i18n } = context;

    const getLocale = (): I18NLocale => {
        const locale = i18n.getContentLocale();
        if (!locale) {
            throw new WebinyError(
                "Missing content locale in api-aco/plugins/context.ts",
                "LOCALE_ERROR"
            );
        }

        return locale;
    };

    const getTenant = (): Tenant => {
        return tenancy.getCurrentTenant();
    };

    const storageOperations = await createAcoStorageOperations({
        /**
         * TODO: We need to figure out a way to pass "cms" from outside (e.g. apps/api/graphql)
         */
        cms: context.cms,
        /**
         * TODO: This is required for "entryFieldFromStorageTransform" which access plugins from context.
         */
        getCmsContext: () => context,
        documentClient: setupAcoContextParams.documentClient,
        security
    });

    const flpCrudMethods = createFlpCrudMethods({
        getLocale,
        getTenant,
        storageOperations
    });

    const folderLevelPermissions = new FolderLevelPermissions({ context, crud: flpCrudMethods });

    const params: CreateAcoParams = {
        getLocale,
        getTenant,
        storageOperations,
        folderLevelPermissions
    };

    const defaultRecordModel = await context.security.withoutAuthorization(async () => {
        return context.cms.getModel(SEARCH_RECORD_MODEL_ID);
    });

    if (!defaultRecordModel) {
        throw new WebinyError(`There is no default record model in ${SEARCH_RECORD_MODEL_ID}`);
    }

    /**
     * First we need to create all the apps.
     */
    const apps = new AcoApps(context, params);
    const plugins = context.plugins.byType<AcoAppRegisterPlugin>(AcoAppRegisterPlugin.type);
    for (const plugin of plugins) {
        await apps.register({
            model: defaultRecordModel,
            ...plugin.app
        });
    }

    context.aco = {
        folder: createFolderCrudMethods({
            ...params,
            context
        }),
        search: createSearchRecordCrudMethods(params),
        folderLevelPermissions,
        filter: createFilterCrudMethods(params),
        flp: flpCrudMethods,
        apps,
        getApp: (name: string) => apps.get(name),
        listApps: () => apps.list(),
        registerApp: async (params: IAcoAppRegisterParams) => {
            return apps.register({
                model: defaultRecordModel,
                ...params
            });
        }
    };

    if (context.wcp.canUseFolderLevelPermissions()) {
        new CmsEntriesCrudDecorators({ context }).decorate();

        // PB decorators registered here: packages/api-page-builder-aco/src/index.ts
        // new PageBuilderCrudDecorators({ context }).decorate();
    }
};

export const createAcoContext = (params: CreateAcoContextParams) => {
    const plugin = new ContextPlugin<AcoContext>(async context => {
        /**
         * We can skip the ACO initialization if the installation is pending.
         */
        if (!(await isHeadlessCmsReady(context))) {
            return;
        }

        await context.benchmark.measure("aco.context.setup", async () => {
            await setupAcoContext(context, params);
        });

        await context.benchmark.measure("aco.context.hooks", async () => {
            await createAcoHooks(context);
        });
    });

    plugin.name = "aco.createContext";

    return plugin;
};
