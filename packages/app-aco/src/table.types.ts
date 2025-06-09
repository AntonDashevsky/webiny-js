import { type CmsIdentity, type FolderItem, type GenericSearchData, type Location } from "~/types.js";

export interface SearchRecordItem<TData extends GenericSearchData = GenericSearchData> {
    id: string;
    type: string;
    title: string;
    content: string;
    location: Location;
    data: TData;
    tags: string[];
    createdOn: string;
    createdBy: CmsIdentity;
    savedOn: string;
    savedBy: CmsIdentity;
    modifiedOn: string | null;
    modifiedBy: CmsIdentity | null;
}

export type MovableSearchRecordItem = Pick<SearchRecordItem, "id" | "location">;

export type DeletableSearchRecordItem = Pick<SearchRecordItem, "id" | "location">;

export interface BaseTableItem {
    $selectable: boolean;
    $type: string;
}

export interface FolderTableItem extends BaseTableItem, FolderItem {
    $type: "FOLDER";
}

export interface RecordTableItem extends BaseTableItem {
    $type: "RECORD";
}
