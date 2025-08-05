import type { Folder, FolderDto, TableRow } from "@webiny/app-aco";
import { FolderDtoMapper } from "@webiny/app-aco";
import { type Redirect, type RedirectDto, RedirectDtoMapper } from "~/domain/Redirect";

export type TableRowDto = TableRow &
    (
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
            data: RedirectDtoMapper.toDTO(redirect)
        };
    }

    static fromFolder(folder: Folder): TableRowDto {
        return {
            id: folder.id,
            $type: "FOLDER",
            $selectable: false,
            data: FolderDtoMapper.toDTO(folder)
        };
    }
}
