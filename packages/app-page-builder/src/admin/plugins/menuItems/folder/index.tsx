import * as React from "react";
import { ReactComponent as LinkIcon } from "./round-folder-24px.svg";
import FolderForm from "./FolderForm.js";
import { type PbMenuItemPlugin } from "../../../../types.js";

const plugin: PbMenuItemPlugin = {
    name: "pb-menu-item-folder",
    type: "pb-menu-item",
    menuItem: {
        type: "folder",
        title: "Folder",
        icon: <LinkIcon />,
        canHaveChildren: true,
        renderForm(props) {
            return <FolderForm {...props} />;
        }
    }
};

export default plugin;
