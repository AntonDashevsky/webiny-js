import { GraphQLSchemaPlugin } from "@webiny/handler-graphql/plugins/index.js";
import type { TenancyContext } from "@webiny/api-tenancy/types.js";
import { ContextPlugin } from "@webiny/api";

export const extendTenancy = () => {
    return new ContextPlugin<TenancyContext>(ctx => {
        ctx.waitFor("tenantManager", () => {
            ctx.plugins.register(
                new GraphQLSchemaPlugin<TenancyContext>({
                    typeDefs: /* GraphQL */ `
                        extend input TenantSettingsInput {
                            appClientId: String!
                        }

                        extend type TenantSettings {
                            appClientId: String!
                        }

                        extend type TenancyQuery {
                            appClientId: String
                        }
                    `,
                    resolvers: {
                        TenancyQuery: {
                            appClientId(_, __, context) {
                                const tenant = context.tenancy.getCurrentTenant();
                                return tenant.settings.appClientId;
                            }
                        }
                    }
                })
            );
        });
    });
};
