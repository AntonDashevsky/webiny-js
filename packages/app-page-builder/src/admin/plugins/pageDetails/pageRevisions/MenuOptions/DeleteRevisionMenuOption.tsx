import React from "react";
import { MenuDivider, MenuItem } from "@webiny/ui/Menu/index.js";
import { ListItemGraphic } from "@webiny/ui/List/index.js";
import { Icon } from "@webiny/ui/Icon/index.js";
import { ReactComponent as DeleteIcon } from "~/admin/assets/delete.svg";
import { type PbPageData } from "~/types.js";
import { makeDecoratable } from "@webiny/app-admin";
import { ConfirmationDialog } from "@webiny/ui/ConfirmationDialog/index.js";

export interface DeleteRevisionMenuOptionProps {
    page: PbPageData;
    deleteRevision: () => void;
}

export const PageRevisionDeleteRevisionMenuOption = (props: DeleteRevisionMenuOptionProps) => {
    const { deleteRevision } = props;

    return (
        <ConfirmationDialog
            title="Confirmation required!"
            message={<span>Are you sure you want to delete this revision?</span>}
        >
            {({ showConfirmation }) => (
                <>
                    <MenuDivider />
                    <MenuItem onClick={() => showConfirmation(deleteRevision)}>
                        <ListItemGraphic>
                            <Icon icon={<DeleteIcon />} />
                        </ListItemGraphic>
                        Delete Revision
                    </MenuItem>
                </>
            )}
        </ConfirmationDialog>
    );
};

export const DeleteRevisionMenuOption = makeDecoratable(
    "DeleteRevisionMenuOption",
    PageRevisionDeleteRevisionMenuOption
);
