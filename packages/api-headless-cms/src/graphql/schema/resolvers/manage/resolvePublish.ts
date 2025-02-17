import { ErrorResponse, Response } from "@webiny/handler-graphql/responses.js";
import { CmsEntryResolverFactory as ResolverFactory } from "~/types/index.js";

interface ResolvePublishArgs {
    revision: string;
}

type ResolvePublish = ResolverFactory<any, ResolvePublishArgs>;

export const resolvePublish: ResolvePublish =
    ({ model }) =>
    async (_, args: any, context) => {
        try {
            const entry = await context.cms.publishEntry(model, args.revision);
            return new Response(entry);
        } catch (e) {
            return new ErrorResponse(e);
        }
    };
