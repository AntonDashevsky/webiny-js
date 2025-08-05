import type { Folder, FolderDto } from "@webiny/app-aco";
import { FolderDtoMapper } from "@webiny/app-aco";
import type { WbIdentity } from "~/types.js";
import type { CmsIdentity } from "@webiny/app-headless-cms-common/types/shared.js";
import { type Redirect, type RedirectDto, RedirectDtoMapper } from "~/domain/Redirect";

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
          data: RedirectDto;
      }
    | {
          $type: "FOLDER";
          data: FolderDto;
      }
);

/**
 * This mapper converts a Redirect domain object to data format suitable for rendering with the Table component.
 */
export class TableRowMapper {
    static fromRedirect(redirect: Redirect): TableRowDto {
        return {
            id: redirect.id,
            $type: "RECORD",
            $selectable: true,
            title: `${redirect.redirectFrom} -> ${redirect.redirectTo}`,
            createdBy: this.getIdentity(redirect.createdBy),
            createdOn: redirect.createdOn,
            savedBy: this.getIdentity(redirect.savedBy),
            savedOn: redirect.savedOn,
            data: RedirectDtoMapper.toDTO(redirect)
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
