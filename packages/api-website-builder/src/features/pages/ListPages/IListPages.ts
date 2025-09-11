import type { CmsEntryListSort, CmsEntryListWhere } from "@webiny/api-headless-cms/types/index.js";
import type { WbPage } from "~/context/pages/pages.types.js";

export interface ListWbPagesParams {
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

export interface IListPages {
    execute: (params: ListWbPagesParams) => Promise<[WbPage[], WbListMeta]>;
}
