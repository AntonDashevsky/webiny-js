import React, { useMemo } from "react";
import { useFolders } from "@webiny/app-aco";
import { usePagesPermissions } from "~/hooks/permissions/index.js";
import { usePage } from "~/admin/views/Pages/hooks/usePage.js";
import { DuplicatePage } from "./DuplicatePage.js";

export const SecureDuplicatePage = DuplicatePage.createDecorator(Original => {
    return function SecureDuplicatePageRenderer() {
        const { page } = usePage();
        const { folderLevelPermissions: flp } = useFolders();
        const { canWrite: pagesCanWrite } = usePagesPermissions();

        const { folderId } = page.location;

        const canDuplicate = useMemo(() => {
            return pagesCanWrite(page.data.createdBy.id) && flp.canManageContent(folderId);
        }, [flp, folderId]);

        if (!canDuplicate) {
            return null;
        }

        return <Original />;
    };
});
