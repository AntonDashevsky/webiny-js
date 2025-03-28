import React from "react";
import { usePage } from "~/admin/views/Pages/hooks/usePage.js";
import { usePagesPermissions } from "~/hooks/permissions/index.js";
import { useGetFolderLevelPermission } from "@webiny/app-aco";
import { ChangePageStatus } from "./ChangePageStatus.js";

export const SecureChangePageStatus = () => {
    const { page } = usePage();
    const { getFolderLevelPermission: canManageContent } =
        useGetFolderLevelPermission("canManageContent");
    const { hasPermissions, canPublish, canUnpublish } = usePagesPermissions();

    if (!hasPermissions()) {
        return null;
    }

    const { folderId } = page.location;
    if (!canManageContent(folderId)) {
        return null;
    }

    if (page.data.status === "published") {
        if (canUnpublish()) {
            return <ChangePageStatus />;
        }

        return null;
    }

    if (canPublish()) {
        return <ChangePageStatus />;
    }

    return null;
};
