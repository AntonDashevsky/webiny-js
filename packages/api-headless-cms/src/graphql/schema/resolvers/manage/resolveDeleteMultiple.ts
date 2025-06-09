import { ErrorResponse, ListResponse } from "@webiny/handler-graphql/responses.js";
import { type CmsEntryResolverFactory as ResolverFactory } from "~/types/index.js";

interface ResolveDeleteArgs {
    revision: string;
}

type ResolveDelete = ResolverFactory<any, ResolveDeleteArgs>;

export const resolveDeleteMultiple: ResolveDelete =
    ({ model }) =>
    async (_, args: any, context) => {
        try {
            const response = await context.cms.deleteMultipleEntries(model, {
                entries: args?.entries || []
            });

            return new ListResponse(response);
        } catch (e) {
            return new ErrorResponse(e);
        }
    };
