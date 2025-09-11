import React, { useMemo } from "react";
import { usePagesPermissions } from "~/hooks/permissions";
import { useGetFolderLevelPermission } from "@webiny/app-aco";

import type { UnpublishPageMenuOptionProps } from "./UnpublishPageMenuOption";
import { UnpublishPageMenuOption } from "./UnpublishPageMenuOption";

export const SecureUnpublishPageMenuOption = (props: UnpublishPageMenuOptionProps) => {
    const { page } = props;
    const { canUnpublish: pagesCanUnpublish } = usePagesPermissions();
    const { getFolderLevelPermission: canManageContent } =
        useGetFolderLevelPermission("canManageContent");

    const hasAccess = useMemo(() => {
        return pagesCanUnpublish() && canManageContent(page.wbyAco_location?.folderId);
    }, [page, canManageContent]);

    if (!hasAccess) {
        return null;
    }

    return <UnpublishPageMenuOption {...props} />;
};
