import { ListResponse, ListErrorResponse } from "@webiny/handler-graphql/responses.js";
import {
    CmsEntryMeta,
    CmsEntryResolverFactory as ResolverFactory,
    CmsEntry,
    CmsEntryListParams
} from "~/types/index.js";

type ResolveList = ResolverFactory<any, CmsEntryListParams>;

export const resolveList: ResolveList =
    ({ model }) =>
    async (_: any, args: any, context) => {
        try {
            const response: [CmsEntry[], CmsEntryMeta] = await context.cms.listLatestEntries(
                model,
                args
            );

            return new ListResponse(...response);
        } catch (e) {
            return new ListErrorResponse(e);
        }
    };
