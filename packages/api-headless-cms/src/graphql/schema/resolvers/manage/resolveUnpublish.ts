import { Response, ErrorResponse } from "@webiny/handler-graphql/responses.js";
import { type CmsEntryResolverFactory as ResolverFactory } from "~/types/index.js";

interface ResolveUnpublishArgs {
    revision: string;
}
type ResolveUnpublish = ResolverFactory<any, ResolveUnpublishArgs>;

export const resolveUnpublish: ResolveUnpublish =
    ({ model }) =>
    async (_, args: any, context) => {
        try {
            const entry = await context.cms.unpublishEntry(model, args.revision);
            return new Response(entry);
        } catch (e) {
            return new ErrorResponse(e);
        }
    };
