import type { Folder, FolderDto, TableRow } from "@webiny/app-aco";
import { FolderDtoMapper } from "@webiny/app-aco";
import type { Page, PageDto } from "~/domain/Page/index.js";
import { PageDtoMapper } from "~/domain/Page/index.js";

export type TableRowDto = TableRow &
    (
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
            data: PageDtoMapper.toDTO(page)
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
