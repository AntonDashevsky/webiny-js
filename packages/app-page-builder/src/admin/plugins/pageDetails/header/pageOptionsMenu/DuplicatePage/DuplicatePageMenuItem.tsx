import React from "react";
import { MenuItem } from "@webiny/ui/Menu/index.js";
import { ListItemGraphic } from "@webiny/ui/List/index.js";
import { Icon } from "@webiny/ui/Icon/index.js";
import { usePagesPermissions } from "~/hooks/permissions/index.js";

export interface DuplicatePageMenuItemProps {
    onClick: () => void;
    label: React.ReactNode;
    icon: React.ReactElement;
}

export const DuplicatePageMenuItem = (props: DuplicatePageMenuItemProps) => {
    const { canWrite } = usePagesPermissions();

    if (!canWrite) {
        return null;
    }

    return (
        <MenuItem onClick={props.onClick}>
            <ListItemGraphic>
                <Icon
                    data-testid="pb-page-details-header-page-options-menu-duplicate"
                    icon={props.icon}
                />
            </ListItemGraphic>
            {props.label}
        </MenuItem>
    );
};
