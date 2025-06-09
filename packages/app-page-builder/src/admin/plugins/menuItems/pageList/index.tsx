import * as React from "react";
import { ReactComponent as PageListIcon } from "./round-format_list_bulleted-24px.svg";
import PageListForm from "./PageListForm.js";
import { type PbMenuItemPlugin } from "../../../../types.js";

const plugin: PbMenuItemPlugin = {
    name: "pb-menu-item-page-list",
    type: "pb-menu-item",
    menuItem: {
        type: "pages-list",
        title: "Page list",
        icon: <PageListIcon />,
        canHaveChildren: false,
        renderForm(props) {
            return <PageListForm {...props} />;
        }
    }
};

export default plugin;
