import type { IDeleteFolder } from "./IDeleteFolder.js";
import type { AcoFolderStorageOperations, DeleteFolderParams } from "~/folder/folder.types.js";

export class DeleteFolder implements IDeleteFolder {
    private readonly deleteOperation: AcoFolderStorageOperations["deleteFolder"];

    constructor(deleteOperation: AcoFolderStorageOperations["deleteFolder"]) {
        this.deleteOperation = deleteOperation;
    }

    async execute(params: DeleteFolderParams): Promise<boolean> {
        await this.deleteOperation(params);
        return true;
    }
}
