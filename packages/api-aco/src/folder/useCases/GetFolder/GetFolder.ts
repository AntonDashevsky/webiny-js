import type { IGetFolder } from "./IGetFolder.js";
import type { AcoFolderStorageOperations, Folder, GetFolderParams } from "~/folder/folder.types.js";

export class GetFolder implements IGetFolder {
    private readonly getOperation: AcoFolderStorageOperations["getFolder"];

    constructor(getOperation: AcoFolderStorageOperations["getFolder"]) {
        this.getOperation = getOperation;
    }

    async execute(params: GetFolderParams): Promise<Folder> {
        return await this.getOperation(params);
    }
}
