import React from "react";
import { PageTemplateDialog } from "~/admin/PageTemplateDialog/PageTemplateDialog.js";
import { DynamicTemplateEditorConfig } from "~/admin/templateEditor/DynamicTemplateEditorConfig.js";
import { AddPreviewPane } from "~/admin/ContentEntryForm/AddPreviewPane.js";
import { PassEntryToDataSource } from "~/admin/ContentEntryForm/PassEntryToDataSource.js";
import { Elements } from "~/admin/elements/Elements.js";
import { DynamicPageEditorConfig } from "~/admin/pageEditor/DynamicPageEditorConfig.js";
import { DynamicElementRenderers } from "~/dataInjection/renderers/DynamicElementRenderers.js";
import { ContentEntryEditorConfig } from "@webiny/app-headless-cms";
import { WebsiteDataInjection } from "@webiny/app-page-builder/dataInjection/presets/WebsiteDataInjection.js";
import { AddEntriesListDataSourceContext } from "~/dataInjection/AddEntriesListDataSourceContext.js";

export const SetupDynamicPages = () => {
    return (
        <>
            {/* Register editor elements plugins. */}
            <Elements />

            {/* Decorate page template dialog. */}
            <PageTemplateDialog />

            {/* Configure Template editor. */}
            <DynamicTemplateEditorConfig />

            {/* Configure Page editor. */}
            <DynamicPageEditorConfig />

            {/* Enable live preview in the CMS entry form. */}
            <AddPreviewPane />

            <PassEntryToDataSource />

            {/* Register element renderers and decorators. */}
            <DynamicElementRenderers />

            {/* Add website-style data binding to page preview. */}
            <ContentEntryEditorConfig>
                <WebsiteDataInjection />
                <AddEntriesListDataSourceContext />
            </ContentEntryEditorConfig>
        </>
    );
};
