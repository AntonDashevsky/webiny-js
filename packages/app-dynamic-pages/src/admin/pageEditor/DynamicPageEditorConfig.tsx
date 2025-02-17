import React from "react";
import { PageEditorConfig } from "@webiny/app-page-builder/pageEditor/index.js";
import { ElementEventHandlers } from "./ElementEventHandlers.js";
import { SetupElementDataSettings } from "~/dataInjection/editor/SetupElementDataSettings.js";
import { AddEntriesListDataSourceContext } from "~/dataInjection/AddEntriesListDataSourceContext.js";

export const DynamicPageEditorConfig = () => {
    return (
        <>
            <PageEditorConfig>
                <AddEntriesListDataSourceContext />
                <ElementEventHandlers />
                <SetupElementDataSettings />
            </PageEditorConfig>
        </>
    );
};
