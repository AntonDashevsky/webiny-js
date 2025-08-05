import type { Folder, FolderDto } from "@webiny/app-aco";
import { FolderDtoMapper } from "@webiny/app-aco";
import type { Page, PageDto } from "~/domain/Page/index.js";
import { PageDtoMapper } from "~/domain/Page/index.js";
import type { WbIdentity } from "~/types.js";
import type { CmsIdentity } from "@webiny/app-headless-cms-common/types/shared.js";

export type TableRowDto = {
    id: string;
    $selectable: boolean;
    title: string;
    createdBy: WbIdentity;
    savedBy: WbIdentity;
    createdOn: string;
    savedOn: string;
} & (
    | {
          $type: "RECORD";
          data: PageDto;
      }
    | {
          $type: "FOLDER";
          data: FolderDto;
      }
);

export class TableRowMapper {
    static fromPage(page: Page): TableRowDto {
        return {
            id: page.id,
            $type: "RECORD",
            $selectable: true,
            title: page.properties.title ?? "",
            createdBy: this.getIdentity(page.createdBy),
            createdOn: page.createdOn,
            savedBy: this.getIdentity(page.savedBy),
            savedOn: page.savedOn,
            data: PageDtoMapper.toDTO(page)
        };
    }

    static fromFolder(folder: Folder): TableRowDto {
        return {
            id: folder.id,
            $type: "FOLDER",
            $selectable: false,
            title: folder.title,
            createdBy: this.getIdentity(folder.createdBy),
            createdOn: folder.createdOn || "",
            savedBy: this.getIdentity(folder.savedBy),
            savedOn: folder.savedOn || "",
            data: FolderDtoMapper.toDTO(folder)
        };
    }

    private static getIdentity(identity: WbIdentity | CmsIdentity | undefined | null): WbIdentity {
        return {
            id: identity?.id || "",
            displayName: identity?.displayName || "",
            type: identity?.type || ""
        };
    }
}
