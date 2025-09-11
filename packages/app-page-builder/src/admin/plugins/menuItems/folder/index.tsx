import * as React from "react";
import { ReactComponent as FolderIcon } from "@webiny/icons/folder.svg";

import FolderForm from "./FolderForm";
import type { PbMenuItemPlugin } from "../../../../types";

const plugin: PbMenuItemPlugin = {
    name: "pb-menu-item-folder",
    type: "pb-menu-item",
    menuItem: {
        type: "folder",
        title: "Folder",
        icon: <FolderIcon />,
        canHaveChildren: true,
        renderForm(props) {
            return <FolderForm {...props} />;
        }
    }
};

export default plugin;
