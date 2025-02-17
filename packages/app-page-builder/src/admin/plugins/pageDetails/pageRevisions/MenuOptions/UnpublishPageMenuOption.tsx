import React from "react";
import { MenuItem } from "@webiny/ui/Menu/index.js";
import { ListItemGraphic } from "@webiny/ui/List/index.js";
import { Icon } from "@webiny/ui/Icon/index.js";
import { ReactComponent as UnpublishIcon } from "~/admin/assets/unpublish.svg";
import { PbPageData, PbPageRevision } from "~/types.js";
import { makeDecoratable } from "@webiny/app-admin";

export interface UnpublishPageMenuOptionProps {
    page: PbPageData;
    revision: PbPageRevision;
    unpublishRevision: (revision: PbPageRevision) => void;
}

export const PageRevisionUnpublishPageMenuOption = (props: UnpublishPageMenuOptionProps) => {
    const { revision, unpublishRevision } = props;

    if (revision.status !== "published") {
        return null;
    }

    return (
        <MenuItem onClick={() => unpublishRevision(revision)}>
            <ListItemGraphic>
                <Icon icon={<UnpublishIcon />} />
            </ListItemGraphic>
            Unpublish
        </MenuItem>
    );
};

export const UnpublishPageMenuOption = makeDecoratable(
    "UnpublishPageMenuOption",
    PageRevisionUnpublishPageMenuOption
);
