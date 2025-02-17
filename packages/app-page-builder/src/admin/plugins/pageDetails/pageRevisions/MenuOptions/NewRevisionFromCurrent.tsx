import React from "react";
import { PbPageData } from "~/types.js";
import { makeDecoratable } from "@webiny/app-admin";
import { MenuItem } from "@webiny/ui/Menu/index.js";
import { ListItemGraphic } from "@webiny/ui/List/index.js";
import { Icon } from "@webiny/ui/Icon/index.js";
import { ReactComponent as AddIcon } from "~/admin/assets/add.svg";

export interface NewRevisionFromCurrentProps {
    page: PbPageData;
    createRevision: () => Promise<void>;
}

export const PageRevisionNewRevisionFromCurrent = (props: NewRevisionFromCurrentProps) => {
    const { createRevision } = props;

    return (
        <MenuItem onClick={createRevision}>
            <ListItemGraphic>
                <Icon icon={<AddIcon />} />
            </ListItemGraphic>
            New from current
        </MenuItem>
    );
};

export const NewRevisionFromCurrent = makeDecoratable(
    "NewRevisionFromCurrent",
    PageRevisionNewRevisionFromCurrent
);
