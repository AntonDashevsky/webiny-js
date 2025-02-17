import React from "react";

import { OptionsMenu } from "@webiny/app-admin";
import { useAcoConfig } from "~/config/index.js";
import { useFolder } from "~/hooks/index.js";

import { Container } from "./styled.js";

export const MenuActions = () => {
    const { folder } = useFolder();
    const { folder: folderConfig } = useAcoConfig();

    // If the user cannot manage folder structure, no need to show the menu.
    if (!folder.canManageStructure) {
        return null;
    }

    return (
        <Container className={"folder-tree-menu-action"}>
            <OptionsMenu actions={folderConfig.actions} data-testid={"folder.tree.menu-action"} />
        </Container>
    );
};
