import type { IListFolders } from "./IListFolders.js";
import type { AcoFolderStorageOperations, Folder, ListFoldersParams } from "~/folder/folder.types.js";
import type { ListMeta } from "~/types.js";

export class ListFolders implements IListFolders {
    private readonly listOperation: AcoFolderStorageOperations["listFolders"];

    constructor(listOperation: AcoFolderStorageOperations["listFolders"]) {
        this.listOperation = listOperation;
    }

    async execute(params: ListFoldersParams): Promise<[Folder[], ListMeta]> {
        return await this.listOperation(params);
    }
}
