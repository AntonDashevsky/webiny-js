import type { CmsEntryListSort, CmsEntryListWhere } from "@webiny/api-headless-cms/types/index.js";
import type { WbRedirect } from "~/context/redirects/redirects.types.js";

export interface ListWbRedirectsParams {
    where: CmsEntryListWhere;
    sort: CmsEntryListSort;
    limit: number;
    after: string | null;
    search?: string;
}

export interface WbListMeta {
    hasMoreItems: boolean;
    totalCount: number;
    cursor: string | null;
}

export interface IListRedirects {
    execute: (params: ListWbRedirectsParams) => Promise<[WbRedirect[], WbListMeta]>;
}
