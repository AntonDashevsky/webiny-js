import React, { useMemo } from "react";
import { usePagesPermissions } from "~/hooks/permissions/index.js";
import { useGetFolderLevelPermission } from "@webiny/app-aco";

import { type PublishPageMenuOptionProps, PublishPageMenuOption } from "./PublishPageMenuOption.js";
import { usePage } from "~/admin/views/Pages/PageDetails.js";

export const SecurePublishPageMenuOption = (props: PublishPageMenuOptionProps) => {
    const { page } = usePage();
    const { canPublish: pagesCanPublish } = usePagesPermissions();
    const { getFolderLevelPermission: canManageContent } =
        useGetFolderLevelPermission("canManageContent");

    const hasAccess = useMemo(() => {
        return pagesCanPublish() && canManageContent(page.wbyAco_location?.folderId);
    }, [page, canManageContent]);

    if (!hasAccess) {
        return null;
    }

    return <PublishPageMenuOption {...props} />;
};
