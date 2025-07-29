import type { WbIdentity, WbLocation } from "~/types";
import type { WbStatus } from "~/constants.js";
import type { Page } from "~/domain/Page/index.js";

export interface PageDto {
    id: string;
    entryId: string;
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
            entryId: page.entryId,
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
