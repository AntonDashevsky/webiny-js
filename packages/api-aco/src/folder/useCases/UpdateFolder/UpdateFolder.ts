import type { IUpdateFolder } from "./IUpdateFolder.js";
import type { AcoFolderStorageOperations, Folder, UpdateFolderParams } from "~/folder/folder.types.js";

export class UpdateFolder implements IUpdateFolder {
    private readonly updateOperation: AcoFolderStorageOperations["updateFolder"];

    constructor(updateOperation: AcoFolderStorageOperations["updateFolder"]) {
        this.updateOperation = updateOperation;
    }

    async execute(id: string, params: UpdateFolderParams): Promise<Folder> {
        return await this.updateOperation({ id, data: params });
    }
}
