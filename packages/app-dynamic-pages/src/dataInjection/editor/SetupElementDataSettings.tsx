import React from "react";
import { ElementDataSettings } from "./ElementDataSettings.js";
import { EditorConfig } from "@webiny/app-page-builder/editor/index.js";

const { Ui } = EditorConfig;

export const SetupElementDataSettings = () => {
    return (
        <>
            <Ui.Sidebar.Group name={"data"} element={<ElementDataSettings />} />
        </>
    );
};
