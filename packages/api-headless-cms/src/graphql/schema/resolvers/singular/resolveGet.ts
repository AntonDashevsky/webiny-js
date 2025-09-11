import { ErrorResponse, Response } from "@webiny/handler-graphql/responses.js";
import type { CmsEntryResolverFactory as ResolverFactory } from "~/types/index.js";

interface ResolveGetArgs {
    revision: string;
}

type ResolveGet = ResolverFactory<any, ResolveGetArgs>;

export const resolveGet: ResolveGet =
    ({ model }) =>
    async (_: unknown, __: unknown, context) => {
        try {
            const manager = await context.cms.getSingletonEntryManager(model);
            const entry = await manager.get();

            return new Response(entry);
        } catch (e) {
            return new ErrorResponse(e);
        }
    };
