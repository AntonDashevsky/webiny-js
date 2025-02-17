import React, { useMemo } from "react";
import { usePagesPermissions } from "~/hooks/permissions/index.js";
import { useFolders } from "@webiny/app-aco";

import {
    DeleteRevisionMenuOption,
    DeleteRevisionMenuOptionProps
} from "./DeleteRevisionMenuOption.js";

export const SecureDeleteRevisionMenuOption = (props: DeleteRevisionMenuOptionProps) => {
    const { page } = props;
    const { canDelete: pagesCanDelete } = usePagesPermissions();
    const { folderLevelPermissions: flp } = useFolders();

    const hasAccess = useMemo(() => {
        return (
            pagesCanDelete(page?.createdBy?.id) &&
            flp.canManageContent(page.wbyAco_location?.folderId)
        );
    }, [page]);

    if (!hasAccess) {
        return null;
    }

    return <DeleteRevisionMenuOption {...props} />;
};
