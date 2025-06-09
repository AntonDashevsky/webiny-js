import { Response, ErrorResponse } from "@webiny/handler-graphql/responses.js";
import { type CmsEntryResolverFactory as ResolverFactory } from "~/types/index.js";

interface ResolveRepublishArgs {
    revision: string;
}
type ResolveRepublish = ResolverFactory<any, ResolveRepublishArgs>;

export const resolveRepublish: ResolveRepublish =
    ({ model }) =>
    async (_, args: any, context) => {
        try {
            const entry = await context.cms.republishEntry(model, args.revision);
            return new Response(entry);
        } catch (e) {
            return new ErrorResponse(e);
        }
    };
