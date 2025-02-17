import React, { useMemo } from "react";
import { usePage } from "~/admin/views/Pages/hooks/usePage.js";
import { usePagesPermissions } from "~/hooks/permissions/index.js";
import { useFolders } from "@webiny/app-aco";
import { DeletePage } from "./DeletePage.js";

export const SecureDeletePage = () => {
    const { page } = usePage();
    const { folderLevelPermissions: flp } = useFolders();
    const { canDelete: pagesCanDelete } = usePagesPermissions();

    const { folderId } = page.location;
    const canDelete = useMemo(() => {
        return pagesCanDelete(page.data.createdBy.id) && flp.canManageContent(folderId);
    }, [flp, folderId]);

    if (!canDelete) {
        return null;
    }

    return <DeletePage />;
};
