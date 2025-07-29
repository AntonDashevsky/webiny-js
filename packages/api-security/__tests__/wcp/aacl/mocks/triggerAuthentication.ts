import { BeforeHandlerPlugin } from "@webiny/handler";
import type { SecurityContext } from "@webiny/api-security/types";

export const triggerAuthentication = () => {
    return new BeforeHandlerPlugin<SecurityContext>(context => {
        context.security.authenticate("");
    });
};
