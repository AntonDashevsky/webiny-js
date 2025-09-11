import { createBeforeHandlerPlugin } from "@webiny/handler";
import type { Context as BaseContext } from "@webiny/handler/types";
import { authenticateUsingCookie } from "./authenticateUsingCookie";
import type { SecurityContext } from "~/types";
import { setupSecureHeaders } from "~/plugins/secureHeaders";

type Context = BaseContext & SecurityContext;

export interface GetHeader {
    (context: Context): string | null | undefined;
}

const defaultGetHeader: GetHeader = context => {
    const header = context.request.headers["authorization"];

    return header ? header.split(" ").pop() : null;
};

export const authenticateUsingHttpHeader = (getHeader: GetHeader = defaultGetHeader) => {
    return [
        createBeforeHandlerPlugin<Context>(async context => {
            const token = getHeader(context);

            if (!token) {
                return;
            }

            await context.security.authenticate(token);
        }),
        // Configure strict headers (this is also a requirement to use cookies).
        setupSecureHeaders(),
        // Finally, we add cookie-based authentication.
        authenticateUsingCookie()
    ];
};
