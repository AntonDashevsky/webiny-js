import { BeforeHandlerPlugin } from "@webiny/handler";
import type { SecurityContext } from "~/types";

export const triggerAuthentication = () => {
    return new BeforeHandlerPlugin<SecurityContext>(context => {
        context.security.authenticate("");
    });
};
