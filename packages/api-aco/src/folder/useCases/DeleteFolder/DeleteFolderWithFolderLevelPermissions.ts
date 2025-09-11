import type { FolderLevelPermissions } from "~/flp/index.js";
import type { IDeleteFolder } from "./IDeleteFolder.js";
import type { DeleteFolderParams } from "~/folder/folder.types.js";

export class DeleteFolderWithFolderLevelPermissions implements IDeleteFolder {
    private folderLevelPermissions: FolderLevelPermissions;
    private readonly decoretee: IDeleteFolder;

    constructor(folderLevelPermissions: FolderLevelPermissions, decoretee: IDeleteFolder) {
        this.folderLevelPermissions = folderLevelPermissions;
        this.decoretee = decoretee;
    }

    async execute(params: DeleteFolderParams) {
        const permissions = await this.folderLevelPermissions.getFolderLevelPermissions(params.id);
        await this.folderLevelPermissions.ensureCanAccessFolder({
            permissions,
            rwd: "d"
        });
        await this.decoretee.execute(params);
        return true;
    }
}
