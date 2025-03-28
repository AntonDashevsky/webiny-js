import { createGroupsTeamsAuthorizer, GroupsTeamsAuthorizerConfig } from "@webiny/api-security";
import { createExternalIdpAdminUserHooksPlugin } from "@webiny/api-admin-users/createExternalIdpAdminUserHooks.js";
import { createAuthenticator, AuthenticatorConfig } from "~/createAuthenticator.js";
import { createIdentityType } from "~/createIdentityType.js";
import { extendTenancy } from "./extendTenancy.js";

import { Context } from "~/types.js";

export interface CreateOktaConfig<TContext extends Context = Context>
    extends AuthenticatorConfig,
        GroupsTeamsAuthorizerConfig<TContext> {
    graphQLIdentityType?: string;
}

export const createOkta = <TContext extends Context = Context>(
    config: CreateOktaConfig<TContext>
) => {
    const identityType = config.identityType || "admin";
    const graphQLIdentityType = config.graphQLIdentityType || "OktaIdentity";

    return [
        createAuthenticator({
            issuer: config.issuer,
            getIdentity: config.getIdentity
        }),
        createGroupsTeamsAuthorizer<TContext>({
            identityType,
            getGroupSlug: config.getGroupSlug
        }),
        createIdentityType({
            identityType,
            name: graphQLIdentityType
        }),
        extendTenancy(),
        createExternalIdpAdminUserHooksPlugin()
    ];
};
