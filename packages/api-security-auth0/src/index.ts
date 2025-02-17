import {
    createGroupsTeamsAuthorizer,
    type GroupsTeamsAuthorizerConfig
} from "@webiny/api-security";

export { createIdentityType } from "./createIdentityType.js";
export { createAuthenticator } from "./createAuthenticator.js";
export type { AuthenticatorConfig } from "./createAuthenticator.js";
export { createAuth0 } from "./createAuth0.js";

export { createGroupsTeamsAuthorizer, type GroupsTeamsAuthorizerConfig };

// Backwards compatibility.
// @deprecated Use `createGroupsTeamsAuthorizer` instead.
const createGroupAuthorizer = createGroupsTeamsAuthorizer;

// @deprecated Use `GroupsTeamsAuthorizerConfig` instead.
type GroupAuthorizerConfig = GroupsTeamsAuthorizerConfig;

export { createGroupAuthorizer, type GroupAuthorizerConfig };
