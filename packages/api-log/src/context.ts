import { ContextPlugin } from "@webiny/api/plugins/ContextPlugin.js";
import { Context } from "~/types.js";
import { loggerFactory } from "~/logger/factory.js";
import { createCrud } from "~/crud/index.js";
import { checkPermissionFactory } from "~/security/checkPermission.js";
import { createGraphQl } from "~/graphql/index.js";
import { DynamoDBDocument } from "@webiny/aws-sdk/client-dynamodb";

export interface ICreateLoggerContextParams {
    documentClient?: DynamoDBDocument;
    getTenant?: () => string;
    getLocale?: () => string;
    createGraphQL?: boolean;
}

const getDocumentClient = (context: Context) => {
    // @ts-expect-error
    const { documentClient } = context.db?.driver || {};
    if (!documentClient) {
        throw new Error("Missing document client on the context.");
    }
    return documentClient;
};

export const createContextPlugin = (params?: ICreateLoggerContextParams) => {
    const plugin = new ContextPlugin<Context>(async context => {
        const getTenant = () => {
            if (params?.getTenant) {
                return params.getTenant();
            }
            const tenant = context.tenancy?.getCurrentTenant?.();
            if (!tenant) {
                throw new Error("Missing tenant.");
            }
            return tenant.id;
        };
        const getLocale = () => {
            if (params?.getLocale) {
                return params.getLocale();
            }
            const locale = context.i18n?.getContentLocale?.();
            if (!locale) {
                throw new Error("Missing locale.");
            }
            return locale.code;
        };

        const getContext = () => context;

        const { logger, storageOperations } = loggerFactory({
            documentClient: params?.documentClient || getDocumentClient(context),
            getLocale,
            getTenant
        });

        context.logger = {
            log: logger,
            ...createCrud({
                getContext,
                storageOperations,
                checkPermission: checkPermissionFactory({ getContext })
            })
        };
        context.plugins.register(createGraphQl(params));
    });

    plugin.name = "logger.createContext";
    return plugin;
};
