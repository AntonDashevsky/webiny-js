import { type AcoContext, type Folder, type IAcoApp } from "@webiny/api-aco/types.js";
import { type Page, type PbPageElement } from "@webiny/api-page-builder/types.js";
import { type PbContext } from "@webiny/api-page-builder/graphql/types.js";
import { type Context as BaseContext } from "@webiny/handler/types.js";
import { type PB_PAGE_TYPE } from "~/contants.js";

interface PageSearchProcessorParams {
    page: Page;
    block: PbPageElement;
    element: PbPageElement;
}

export type PbPageRecordData = Pick<
    Page,
    | "id"
    | "pid"
    | "title"
    | "createdOn"
    | "createdBy"
    | "savedOn"
    | "status"
    | "version"
    | "locked"
    | "path"
>;

export interface PageSearchProcessor {
    (params: PageSearchProcessorParams): string;
}

export interface PbAcoContext extends BaseContext, AcoContext, PbContext {
    pageBuilderAco: {
        app: IAcoApp;
        addPageSearchProcessor(processor: PageSearchProcessor): void;
        getSearchablePageContent(content: Page): Promise<string>;
        getAncestorFoldersByPage(page: Page): Promise<Folder[]>;
    };
}

export interface PbPayloadLocation {
    folderId: string;
}
export interface PbCreatePayload {
    id: string;
    type: typeof PB_PAGE_TYPE;
    title: string;
    content: string;
    location: PbPayloadLocation;
    tags: string[];
    data: PbPageRecordData;
}

export interface PbUpdatePayload {
    title: string;
    content: string;
    tags: string[];
    data: PbPageRecordData;
}
