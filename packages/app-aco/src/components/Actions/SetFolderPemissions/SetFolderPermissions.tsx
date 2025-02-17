import React, { useCallback } from "react";
import { ReactComponent as Security } from "@material-design-icons/svg/outlined/add_moderator.svg";

import { AcoConfig } from "~/config/index.js";
import { useSetPermissionsDialog } from "~/dialogs/index.js";
import { useFolder } from "~/hooks/index.js";

export const SetFolderPermissions = () => {
    const { folder } = useFolder();
    const { showDialog } = useSetPermissionsDialog();
    const { OptionsMenuItem } = AcoConfig.Folder.Action;

    const onAction = useCallback(() => {
        showDialog({
            folder
        });
    }, [folder]);

    if (!folder || !folder.canManagePermissions) {
        return null;
    }

    return (
        <OptionsMenuItem
            icon={<Security />}
            label={"Manage Permissions"}
            onAction={onAction}
            data-testid={"aco.actions.folder.setPermissions"}
        />
    );
};
