import { attachApwHooks } from "./hooks/index.js";
import WebinyError from "@webiny/error";
import { ContextPlugin } from "@webiny/api";
import { type ApwContext } from "~/types.js";
import { createApw } from "~/crud/index.js";
import { apwPageBuilderHooks } from "./pageBuilder/index.js";
import { createStorageOperations } from "~/storageOperations/index.js";
import { type SecurityPermission } from "@webiny/api-security/types.js";
import { type Tenant } from "@webiny/api-tenancy/types.js";
import { type CreateApwContextParams } from "~/scheduler/types.js";
import { createScheduler } from "~/scheduler/index.js";
import { createCustomAuth } from "~/scheduler/handlers/executeAction/security.js";
import { isInstallationPending } from "./utils.js";
import { extendPbPageSettingsSchema } from "~/plugins/pageBuilder/extendPbPageSettingsSchema.js";
import { apwContentPagePlugins } from "~/plugins/pageBuilder/apwContentPagePlugins.js";
import { apwCmsHooks } from "~/plugins/cms/index.js";
import { type I18NLocale } from "@webiny/api-i18n/types.js";

const setupApwContext = (params: CreateApwContextParams) =>
    new ContextPlugin<ApwContext>(async context => {
        const { tenancy, security, i18n, handlerClient } = context;

        if (isInstallationPending({ tenancy, i18n })) {
            return;
        }

        const getLocale = (): I18NLocale => {
            const locale = i18n.getContentLocale();
            if (!locale) {
                throw new WebinyError(
                    "Missing content locale in api-apw/plugins/context.ts",
                    "LOCALE_ERROR"
                );
            }

            return locale;
        };

        const getTenant = (): Tenant => {
            return tenancy.getCurrentTenant();
        };

        const getPermission = async (name: string): Promise<SecurityPermission | null> => {
            return security.getPermission(name);
        };
        const getIdentity = () => security.getIdentity();

        const scheduler = createScheduler({
            getLocale,
            getIdentity,
            getTenant,
            getPermission,
            storageOperations: params.storageOperations
        });

        context.apw = createApw({
            getLocale,
            getIdentity,
            getTenant,
            getPermission,
            storageOperations: createStorageOperations({
                /**
                 * TODO: We need to figure out a way to pass "cms" from outside (e.g. apps/api/graphql)
                 */
                cms: context.cms,
                /**
                 * TODO: This is required for "entryFieldFromStorageTransform" which access plugins from context.
                 */
                getCmsContext: () => context,
                security
            }),
            scheduler,
            handlerClient,
            plugins: context.plugins
        });
    });

const setupApwPageBuilder = () => {
    return new ContextPlugin<ApwContext>(async context => {
        apwPageBuilderHooks(context);
    });
};

const setupApwHeadlessCms = () => {
    return new ContextPlugin<ApwContext>(async context => {
        apwCmsHooks(context);
    });
};

export const createApwPageBuilderContext = (params: CreateApwContextParams) => {
    return new ContextPlugin<ApwContext>(async context => {
        if (!context.wcp.canUseFeature("advancedPublishingWorkflow")) {
            return;
        } else if (isInstallationPending(context)) {
            return;
        }

        await setupApwContext(params).apply(context);
        await setupApwPageBuilder().apply(context);
        await setupApwHeadlessCms().apply(context);
        await apwContentPagePlugins().apply(context);
        await attachApwHooks().apply(context);
        await createCustomAuth(params).apply(context);

        context.plugins.register(extendPbPageSettingsSchema());
    });
};
