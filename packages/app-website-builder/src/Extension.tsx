import React from "react";
import { AdminConfig } from "@webiny/app-admin";
import { PageEditor } from "./pages/PageEditor.js";

export const Extension = () => {
    return (
        <AdminConfig>
            <AdminConfig.Route
                name="wb.pages.editor"
                path="/wb/pages/editor"
                element={<PageEditor />}
            />
        </AdminConfig>
    );
};
