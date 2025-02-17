import { createAuthenticator, AuthenticatorConfig } from "~/createAuthenticator.js";
import { createGroupsTeamsAuthorizer, GroupsTeamsAuthorizerConfig } from "@webiny/api-security";
import { createIdentityType } from "~/createIdentityType.js";
import { createAdminUsersHooks } from "./createAdminUsersHooks.js";
import { extendTenancy } from "./extendTenancy.js";
import { Context } from "~/types.js";

export interface CreateAuth0Config<TContext extends Context = Context>
    extends AuthenticatorConfig,
        GroupsTeamsAuthorizerConfig<TContext> {
    graphQLIdentityType?: string;
}

export const createAuth0 = <TContext extends Context = Context>(
    config: CreateAuth0Config<TContext>
) => {
    const identityType = config.identityType || "admin";
    const graphQLIdentityType = config.graphQLIdentityType || "Auth0Identity";

    return [
        createAuthenticator({
            domain: config.domain,
            getIdentity: config.getIdentity
        }),
        createGroupsTeamsAuthorizer<TContext>({
            identityType,
            getGroupSlug: config.getGroupSlug,
            inheritGroupsFromParentTenant: config.inheritGroupsFromParentTenant,
            canAccessTenant: config.canAccessTenant
        }),
        createIdentityType({
            identityType,
            name: graphQLIdentityType
        }),
        extendTenancy(),
        createAdminUsersHooks()
    ];
};
