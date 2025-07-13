import type { WbIdentity, WbLocation } from "~/types";
import type { WbStatus } from "~/constants.js";
import { Page } from "~/domains/Page/index.js";

export interface PageDto {
    id: string;
    pageId: string;
    status: WbStatus;
    location: WbLocation;
    properties: Record<string, any>;
    metadata: Record<string, any>;
    bindings: Record<string, any>;
    elements: Record<string, any>;
    extensions: Record<string, any>;
    createdBy: WbIdentity;
    createdOn: string;
    savedBy: WbIdentity;
    savedOn: string;
    modifiedBy: WbIdentity;
    modifiedOn: string;
}

export class PageDtoMapper {
    static toDTO(page: Page): PageDto {
        return {
            id: page.id,
            pageId: page.pageId,
            status: page.status,
            location: page.location,
            properties: page.properties,
            metadata: page.metadata,
            bindings: page.bindings,
            elements: page.elements,
            extensions: page.extensions,
            createdBy: page.createdBy,
            createdOn: page.createdOn,
            savedBy: page.savedBy,
            savedOn: page.savedOn,
            modifiedBy: page.modifiedBy,
            modifiedOn: page.modifiedOn
        };
    }
}
