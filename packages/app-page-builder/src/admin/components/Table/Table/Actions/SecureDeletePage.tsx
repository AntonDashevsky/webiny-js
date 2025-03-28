import React, { useMemo } from "react";
import { usePage } from "~/admin/views/Pages/hooks/usePage.js";
import { usePagesPermissions } from "~/hooks/permissions/index.js";
import { useGetFolderLevelPermission } from "@webiny/app-aco";
import { DeletePage } from "./DeletePage.js";

export const SecureDeletePage = () => {
    const { page } = usePage();
    const { getFolderLevelPermission: canManageContent } =
        useGetFolderLevelPermission("canManageContent");
    const { canDelete: pagesCanDelete } = usePagesPermissions();

    const { folderId } = page.location;
    const canDelete = useMemo(() => {
        return pagesCanDelete(page.data.createdBy.id) && canManageContent(folderId);
    }, [canManageContent, folderId]);

    if (!canDelete) {
        return null;
    }

    return <DeletePage />;
};
