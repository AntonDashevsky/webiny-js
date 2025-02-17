import { PbErrorResponse, PbPageData, PbPageDataItem, PbPageTableItem } from "~/types.js";
import { SearchRecordItem } from "@webiny/app-aco/table.types.js";
import { Location } from "@webiny/app-aco/types.js";

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
