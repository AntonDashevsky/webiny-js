import { type SecurityContext, type SecurityIdentity } from "@webiny/api-security/types.js";

export const mockSecurity = (identity: SecurityIdentity, context: SecurityContext) => {
    context.security.setIdentity(identity);
};
