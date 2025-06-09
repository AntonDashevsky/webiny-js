import { ListResponse, ListErrorResponse } from "@webiny/handler-graphql/responses.js";
import {
    type CmsEntryMeta,
    type CmsEntryResolverFactory as ResolverFactory,
    type CmsEntry,
    type CmsEntryListParams
} from "~/types/index.js";

type ResolveListDeleted = ResolverFactory<any, CmsEntryListParams>;

export const resolveListDeleted: ResolveListDeleted =
    ({ model }) =>
    async (_, args: any, context) => {
        try {
            const response: [CmsEntry[], CmsEntryMeta] = await context.cms.listDeletedEntries(
                model,
                args
            );

            return new ListResponse(...response);
        } catch (e) {
            return new ListErrorResponse(e);
        }
    };
