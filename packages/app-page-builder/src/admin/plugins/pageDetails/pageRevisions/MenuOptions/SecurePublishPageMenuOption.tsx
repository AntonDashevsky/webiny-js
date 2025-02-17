import React, { useMemo } from "react";
import { usePagesPermissions } from "~/hooks/permissions/index.js";
import { useFolders } from "@webiny/app-aco";

import { PublishPageMenuOptionProps, PublishPageMenuOption } from "./PublishPageMenuOption.js";
import { usePage } from "~/admin/views/Pages/PageDetails.js";

export const SecurePublishPageMenuOption = (props: PublishPageMenuOptionProps) => {
    const { page } = usePage();
    const { canPublish: pagesCanPublish } = usePagesPermissions();
    const { folderLevelPermissions: flp } = useFolders();

    const hasAccess = useMemo(() => {
        return pagesCanPublish() && flp.canManageContent(page.wbyAco_location?.folderId);
    }, [page]);

    if (!hasAccess) {
        return null;
    }

    return <PublishPageMenuOption {...props} />;
};
