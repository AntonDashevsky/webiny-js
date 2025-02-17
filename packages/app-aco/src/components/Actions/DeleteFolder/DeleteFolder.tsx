import React, { useCallback } from "react";
import { ReactComponent as DeleteIcon } from "@material-design-icons/svg/outlined/delete.svg";

import { AcoConfig } from "~/config/index.js";
import { useDeleteDialog } from "~/dialogs/index.js";
import { useFolder } from "~/hooks/index.js";

export const DeleteFolder = () => {
    const { folder } = useFolder();
    const { showDialog } = useDeleteDialog();
    const { OptionsMenuItem } = AcoConfig.Folder.Action;

    const onAction = useCallback(() => {
        showDialog({
            folder
        });
    }, [folder]);

    if (!folder) {
        return null;
    }

    return (
        <OptionsMenuItem
            icon={<DeleteIcon />}
            label={"Delete"}
            onAction={onAction}
            data-testid={"aco.actions.folder.delete"}
        />
    );
};
