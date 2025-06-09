import { type PbErrorResponse, type PbPageData, type PbPageDataItem, type PbPageTableItem } from "~/types.js";
import { type SearchRecordItem } from "@webiny/app-aco/table.types.js";
import { type Location } from "@webiny/app-aco/types.js";

export type PageItem = PbPageTableItem | PbPageData | SearchRecordItem<PbPageDataItem>;

export const isPbPageData = (page: PageItem): page is PbPageData => {
    return "wbyAco_location" in page;
};

export interface DuplicatePageVariables {
    id: string;
    meta: {
        location: Location;
    };
}

export interface DuplicatePageResponse {
    pageBuilder: {
        duplicatePage: {
            data: PbPageData;
            error: PbErrorResponse;
        };
    };
}
