import React from "react";
import { MenuItem } from "@webiny/ui/Menu/index.js";
import { ListItemGraphic } from "@webiny/ui/List/index.js";
import { Icon } from "@webiny/ui/Icon/index.js";
import { ReactComponent as EditIcon } from "~/admin/assets/edit.svg";
import { type PbPageData, type PbPageRevision } from "~/types.js";
import { makeDecoratable } from "@webiny/app-admin";

export interface EditRevisionMenuOptionProps {
    page: PbPageData;
    revision: PbPageRevision;
    editRevision: () => void;
}

export const PageRevisionEditRevisionMenuOption = (props: EditRevisionMenuOptionProps) => {
    const { revision, editRevision } = props;

    if (revision.locked) {
        return null;
    }

    return (
        <MenuItem onClick={editRevision}>
            <ListItemGraphic>
                <Icon icon={<EditIcon />} />
            </ListItemGraphic>
            Edit
        </MenuItem>
    );
};

export const EditRevisionMenuOption = makeDecoratable(
    "EditRevisionMenuOption",
    PageRevisionEditRevisionMenuOption
);
