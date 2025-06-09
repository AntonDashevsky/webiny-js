import type { ICreateFolder } from "./ICreateFolder.js";
import type { AcoFolderStorageOperations, CreateFolderParams } from "~/folder/folder.types.js";

export class CreateFolder implements ICreateFolder {
    private readonly createOperation: AcoFolderStorageOperations["createFolder"];

    constructor(createOperation: AcoFolderStorageOperations["createFolder"]) {
        this.createOperation = createOperation;
    }

    async execute(params: CreateFolderParams) {
        return await this.createOperation({ data: params });
    }
}
