import { GraphQLSchemaPlugin } from "@webiny/handler-graphql/plugins/index.js";
import type { Context } from "@webiny/api/types.js";

export const applyMultiTenancyPlugins = (context: Context) => {
    context.plugins.register(
        new GraphQLSchemaPlugin({
            typeDefs: /* GraphQL */ `
                extend type AdminUserIdentity {
                    currentTenant: Tenant
                    defaultTenant: Tenant
                }
            `
        })
    );
};
