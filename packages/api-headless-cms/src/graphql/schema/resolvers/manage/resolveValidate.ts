import { Response, ErrorResponse } from "@webiny/handler-graphql/responses.js";
import { CmsEntryResolverFactory as ResolverFactory, UpdateCmsEntryInput } from "~/types/index.js";

interface ResolveUpdateArgs {
    revision?: string;
    data: UpdateCmsEntryInput;
}
type ResolveValidate = ResolverFactory<any, ResolveUpdateArgs>;

export const resolveValidate: ResolveValidate =
    ({ model }) =>
    async (_, args: any, context) => {
        try {
            const entry = await context.cms.validateEntry(model, args.revision, args.data);

            return new Response(entry);
        } catch (e) {
            return new ErrorResponse(e);
        }
    };
