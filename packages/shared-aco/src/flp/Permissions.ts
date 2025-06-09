import type { FolderLevelPermission, FolderPermission } from "~/flp/flp.types.js";

export class Permissions {
    public static create(
        permissions?: FolderPermission[],
        parentFlp?: Pick<FolderLevelPermission, "id" | "permissions"> | null
    ): FolderPermission[] {
        const parentFolderPermissions = parentFlp?.permissions || [];
        const currentFolderPermissions =
            permissions?.filter(p => p.inheritedFrom !== `parent:${parentFlp?.id}`) || [];

        if (!parentFolderPermissions.length) {
            return currentFolderPermissions;
        }

        // Merge parent and current folder permissions:
        // - current folder permissions take precedence over parent permissions
        // - only if parent permission's level is set to `no-access`, then we ignore the current folder permission
        const permissionsInheritedFromParentFolder: FolderPermission[] = [];

        for (const parentFolderPermission of parentFolderPermissions) {
            if (parentFolderPermission.level === "no-access") {
                permissionsInheritedFromParentFolder.push({
                    ...parentFolderPermission,
                    inheritedFrom: `parent:${parentFlp!.id}`
                });
                continue;
            }

            const currentFolderHasOverridePermission = currentFolderPermissions.some(
                permission => permission.target === parentFolderPermission.target
            );

            if (currentFolderHasOverridePermission) {
                continue;
            }

            permissionsInheritedFromParentFolder.push({
                ...parentFolderPermission,
                inheritedFrom: `parent:${parentFlp!.id}`
            });
        }

        // Add current folder permissions that are not present in the parent folder permissions.
        const applicableCurrentFolderPermissions = currentFolderPermissions.filter(permission => {
            const alreadyInInheritedPermissions = permissionsInheritedFromParentFolder.some(
                p => p.target === permission.target
            );

            return !alreadyInInheritedPermissions;
        });

        return [...applicableCurrentFolderPermissions, ...permissionsInheritedFromParentFolder];
    }
}
