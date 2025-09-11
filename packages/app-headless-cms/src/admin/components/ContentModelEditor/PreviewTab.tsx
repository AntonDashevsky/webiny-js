import React from "react";
import { i18n } from "@webiny/app/i18n/index.js";
import type { CmsEditorContentTab } from "~/types.js";
import { useModelEditor } from "~/admin/hooks/index.js";
import { ContentEntryFormPreview } from "../ContentEntryForm/ContentEntryFormPreview.js";
import { Alert } from "@webiny/admin-ui";

const t = i18n.ns("app-headless-cms/admin/components/editor/tabs/preview");

export const PreviewTab: CmsEditorContentTab = ({ activeTab }) => {
    const { data } = useModelEditor();

    return (
        <>
            {data.fields && data.fields.length && activeTab ? (
                <ContentEntryFormPreview contentModel={data} />
            ) : (
                <Alert type="warning">
                    {t`Before previewing the form, please add at least one field to the content model.`}
                </Alert>
            )}
        </>
    );
};
