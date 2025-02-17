import React from "react";
import { TemplateEditorConfig } from "@webiny/app-page-builder/templateEditor/index.js";
import { EntrySelector } from "~/admin/templateEditor/EntrySelector/index.js";
import { hasMainDataSource } from "~/features/index.js";
import { ElementEventHandlers } from "./ElementEventHandlers.js";
import { useDynamicDocument } from "@webiny/app-page-builder/dataInjection/index.js";
import { SetupElementDataSettings } from "~/dataInjection/editor/SetupElementDataSettings.js";
import { AddEntriesListDataSourceContext } from "~/dataInjection/AddEntriesListDataSourceContext.js";

const { Ui } = TemplateEditorConfig;

const OnDynamicTemplate = ({ children }: { children: React.ReactNode }) => {
    const { dataSources } = useDynamicDocument();

    return hasMainDataSource(dataSources) ? <>{children}</> : null;
};

export const DynamicTemplateEditorConfig = () => {
    return (
        <>
            <TemplateEditorConfig>
                <AddEntriesListDataSourceContext />
                <SetupElementDataSettings />
                <Ui.TopBar.Element
                    name={"entrySelector"}
                    element={
                        <OnDynamicTemplate>
                            <EntrySelector />
                        </OnDynamicTemplate>
                    }
                    group={"center"}
                />

                <ElementEventHandlers />
            </TemplateEditorConfig>
        </>
    );
};
