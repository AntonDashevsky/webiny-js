import React, { useMemo } from "react";
import { useGetFolderLevelPermission } from "@webiny/app-aco";
import { usePage } from "~/admin/views/Pages/hooks/usePage.js";
import { usePagesPermissions } from "~/hooks/permissions/index.js";
import { EditPage } from "./EditPage.js";

export const SecureEditPage = () => {
    const { page } = usePage();
    const { getFolderLevelPermission: canManageContent } =
        useGetFolderLevelPermission("canManageContent");
    const { canUpdate: pagesCanUpdate } = usePagesPermissions();

    const { folderId } = page.location;
    const canEdit = useMemo(() => {
        return pagesCanUpdate(page.data.createdBy.id) && canManageContent(folderId);
    }, [canManageContent, folderId]);

    if (!canEdit) {
        return null;
    }

    return <EditPage />;
};
