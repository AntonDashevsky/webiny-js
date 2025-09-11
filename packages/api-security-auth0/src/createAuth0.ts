import type { GroupsTeamsAuthorizerConfig } from "@webiny/api-security";
import { createGroupsTeamsAuthorizer } from "@webiny/api-security";
import { createExternalIdpAdminUserHooksPlugin } from "@webiny/api-admin-users/createExternalIdpAdminUserHooks.js";
import type { AuthenticatorConfig } from "~/createAuthenticator.js";
import { createAuthenticator } from "~/createAuthenticator.js";
import { createIdentityType } from "~/createIdentityType.js";
import { extendTenancy } from "./extendTenancy.js";
import type { Context } from "~/types.js";

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
        createExternalIdpAdminUserHooksPlugin()
    ];
};
