import React, { useMemo } from "react";
import { usePagesPermissions } from "~/hooks/permissions/index.js";
import { useGetFolderLevelPermission } from "@webiny/app-aco";

import {
    DeleteRevisionMenuOption,
    type DeleteRevisionMenuOptionProps
} from "./DeleteRevisionMenuOption.js";

export const SecureDeleteRevisionMenuOption = (props: DeleteRevisionMenuOptionProps) => {
    const { page } = props;
    const { canDelete: pagesCanDelete } = usePagesPermissions();
    const { getFolderLevelPermission: canManageContent } =
        useGetFolderLevelPermission("canManageContent");

    const hasAccess = useMemo(() => {
        return (
            pagesCanDelete(page?.createdBy?.id) && canManageContent(page.wbyAco_location?.folderId)
        );
    }, [page, canManageContent]);

    if (!hasAccess) {
        return null;
    }

    return <DeleteRevisionMenuOption {...props} />;
};
