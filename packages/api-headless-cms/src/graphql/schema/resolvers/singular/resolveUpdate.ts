import { ErrorResponse, Response } from "@webiny/handler-graphql/responses.js";
import {
    type CmsEntryResolverFactory as ResolverFactory,
    type UpdateCmsEntryInput,
    type UpdateCmsEntryOptionsInput
} from "~/types/index.js";

interface ResolveUpdateArgs {
    data: UpdateCmsEntryInput;
    options?: UpdateCmsEntryOptionsInput;
}

type ResolveUpdate = ResolverFactory<any, ResolveUpdateArgs>;

export const resolveUpdate: ResolveUpdate =
    ({ model }) =>
    async (_: unknown, args, context) => {
        try {
            const manager = await context.cms.getSingletonEntryManager(model.modelId);
            const entry = await manager.update(args.data, args.options);

            return new Response(entry);
        } catch (e) {
            return new ErrorResponse(e);
        }
    };
