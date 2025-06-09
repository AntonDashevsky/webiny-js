import React from "react";
import { css } from "emotion";
import { Elevation } from "@webiny/ui/Elevation/index.js";
import { i18n } from "@webiny/app/i18n/index.js";
import { type CmsEditorContentTab } from "~/types.js";
import { useModelEditor } from "~/admin/hooks/index.js";
import { ContentEntryFormPreview } from "../ContentEntryForm/ContentEntryFormPreview.js";

const t = i18n.ns("app-headless-cms/admin/components/editor/tabs/preview");

const formPreviewWrapper = css({
    padding: 40,
    margin: 40,
    boxSizing: "border-box"
});

const style = {
    noFieldsMessage: css({
        textAlign: "center"
    })
};

export const PreviewTab: CmsEditorContentTab = ({ activeTab }) => {
    const { data } = useModelEditor();

    return (
        <Elevation z={1} className={formPreviewWrapper}>
            {data.fields && data.fields.length && activeTab ? (
                <ContentEntryFormPreview contentModel={data} />
            ) : (
                <div className={style.noFieldsMessage}>
                    {t`Before previewing the form, please add at least one field to the content model.`}
                </div>
            )}
        </Elevation>
    );
};
