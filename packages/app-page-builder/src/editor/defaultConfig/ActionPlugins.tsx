import { memo } from "react";
import { plugins } from "@webiny/plugins";

import cloneElementPlugin from "../recoil/actions/cloneElement/plugin.js";
import createElementPlugin from "../recoil/actions/createElement/plugin.js";
import deleteElementPlugin from "../recoil/actions/deleteElement/plugin.js";
import dragPlugin from "../recoil/actions/drag/plugin.js";
import dropElementPlugin from "../recoil/actions/dropElement/plugin.js";
import mirrorCellPlugin from "../recoil/actions/mirrorCell/plugin.js";
import updateElementPlugin from "../recoil/actions/updateElement/plugin.js";
import afterDropElementPlugin from "../recoil/actions/afterDropElement/plugin.js";
import moveBlockPlugin from "../recoil/actions/moveBlock/plugin.js";
import moveElementPlugin from "../recoil/actions/moveElement/plugin.js";
import afterUpdateElementsPlugin from "../recoil/actions/updateElementTree/plugin.js";
import elementSettingsPlugin from "../plugins/elementSettings/advanced/plugin.js";

export const ActionPlugins = memo(() => {
    plugins.register([
        cloneElementPlugin(),
        createElementPlugin(),
        updateElementPlugin(),
        dropElementPlugin(),
        mirrorCellPlugin(),
        afterDropElementPlugin(),
        deleteElementPlugin(),
        moveBlockPlugin(),
        moveElementPlugin(),
        afterUpdateElementsPlugin(),
        ...dragPlugin(),
        elementSettingsPlugin
    ]);

    return null;
});

ActionPlugins.displayName = "ActionPlugins";
