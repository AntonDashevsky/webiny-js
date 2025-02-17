import { TenancyContext, Tenant } from "@webiny/api-tenancy/types.js";
import { Response } from "@webiny/handler-graphql";
import { getDefaultTenant as baseGetDefaultTenant } from "./getDefaultTenant.js";
import { SecurityContext } from "~/types.js";
import { GraphQLSchemaPlugin } from "@webiny/handler-graphql/plugins/index.js";
export { getDefaultTenant } from "./getDefaultTenant.js";

type Context = SecurityContext & TenancyContext;

export interface MultiTenancyAppConfig {
    /**
     * @deprecated This parameter is no longer used.
     */
    verifyIdentityToTenantLink?: boolean;
}

export interface MultiTenancyGraphQLConfig {
    /**
     * NOTE: This parameter is only relevant in multi-tenant environments.
     */
    getDefaultTenant?(context: Context): Promise<Tenant>;
}

export const applyMultiTenancyGraphQLPlugins = (
    config: MultiTenancyGraphQLConfig,
    ctx: Context
) => {
    const getDefaultTenant = async (context: Context) => {
        const defaultTenant = await baseGetDefaultTenant(context);
        if (defaultTenant) {
            return defaultTenant;
        }

        return config.getDefaultTenant
            ? config.getDefaultTenant(context)
            : context.tenancy.getRootTenant();
    };

    ctx.plugins.register(
        new GraphQLSchemaPlugin<Context>({
            typeDefs: /* GraphQL */ `
                extend interface SecurityIdentity {
                    currentTenant: Tenant
                    defaultTenant: Tenant
                }

                extend type TenancyQuery {
                    getDefaultTenant: TenantResponse
                }
            `,
            resolvers: {
                TenancyQuery: {
                    async getDefaultTenant(_, __, context) {
                        return new Response(getDefaultTenant(context));
                    }
                },
                SecurityIdentity: {
                    defaultTenant(_, __, context) {
                        return getDefaultTenant(context);
                    },
                    currentTenant(_, __, context) {
                        return context.tenancy.getCurrentTenant();
                    }
                }
            }
        })
    );
};
