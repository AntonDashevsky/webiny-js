import type { ICreateFolder } from "./ICreateFolder.js";
import type { CreateFolderParams } from "~/folder/folder.types.js";
import { NotAuthorizedError } from "@webiny/api-security";
import type { FolderLevelPermissions } from "~/flp/index.js";

export class CreateFolderWithFolderLevelPermissions implements ICreateFolder {
    private folderLevelPermissions: FolderLevelPermissions;
    private readonly decoretee: ICreateFolder;

    constructor(folderLevelPermissions: FolderLevelPermissions, decoretee: ICreateFolder) {
        this.folderLevelPermissions = folderLevelPermissions;
        this.decoretee = decoretee;
    }

    async execute(params: CreateFolderParams) {
        let canCreateFolder: boolean;
        if (params.parentId) {
            const permissions = await this.folderLevelPermissions.getFolderLevelPermissions(
                params.parentId
            );
            canCreateFolder = await this.folderLevelPermissions.canAccessFolder({
                permissions,
                rwd: "w"
            });
        } else {
            canCreateFolder = this.folderLevelPermissions.canCreateFolderInRoot();
        }

        if (!canCreateFolder) {
            throw new NotAuthorizedError();
        }

        const folder = await this.decoretee.execute(params);

        // Let's set default permissions based on the current user.
        const permissionsWithDefaults = await this.folderLevelPermissions.getDefaultPermissions(
            folder?.permissions ?? []
        );

        return {
            ...folder,
            permissions: permissionsWithDefaults
        };
    }
}
