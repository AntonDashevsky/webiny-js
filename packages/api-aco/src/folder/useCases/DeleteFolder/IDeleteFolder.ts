import type { DeleteFolderParams } from "~/folder/folder.types.js";

export interface IDeleteFolder {
    execute: (params: DeleteFolderParams) => Promise<boolean>;
}
