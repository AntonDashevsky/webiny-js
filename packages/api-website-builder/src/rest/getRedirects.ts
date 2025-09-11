import { createRoute } from "@webiny/handler";
import type { WebsiteBuilderContext } from "~/context/types";
import { ensureAuthentication } from "~/utils/ensureAuthentication";
import { ActiveRedirectRestMapper } from "./ActiveRedirectRestMapper";

export const createRedirectsRoute = () => {
    return createRoute<WebsiteBuilderContext>(({ onGet, context }) => {
        onGet("/wb/redirects", async (_, reply) => {
            try {
                ensureAuthentication(context);
            } catch (err) {
                if (err.code === "SECURITY_NOT_AUTHORIZED") {
                    reply.code(401).send(err.message);
                } else {
                    reply.code(500).send(err.message);
                }
                return;
            }

            const redirects = await context.websiteBuilder.redirects.getActiveRedirects();

            const redirectsDto = redirects.map(entry => ActiveRedirectRestMapper.toDto(entry));

            reply.headers({
                "content-type": "application/json",
                "Cache-Control": "public, max-age=31536000"
            });

            return reply.send(redirectsDto);
        });
    });
};
