import React from "react";
import { MenuItem } from "@webiny/ui/Menu/index.js";
import { ListItemGraphic } from "@webiny/ui/List/index.js";
import { Icon } from "@webiny/ui/Icon/index.js";

export interface PreviewPageMenuItemProps {
    onClick: () => void;
    label: React.ReactNode;
    icon: React.ReactElement;
}

export const PreviewRevisionMenuItem = (props: PreviewPageMenuItemProps) => {
    return (
        <MenuItem onClick={props.onClick}>
            <ListItemGraphic>
                <Icon
                    data-testid="pb-page-details-revisions-page-options-menu-preview"
                    icon={props.icon}
                />
            </ListItemGraphic>
            {props.label}
        </MenuItem>
    );
};
