import { ContextPlugin } from "@webiny/api";
import { type AuthenticationContext } from "~/types.js";
import { createAuthentication } from "~/createAuthentication.js";

export default () => {
    return new ContextPlugin<AuthenticationContext>(context => {
        context.authentication = createAuthentication();
    });
};
