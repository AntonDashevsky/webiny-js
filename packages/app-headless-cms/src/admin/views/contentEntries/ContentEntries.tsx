import React from "react";
import { DialogsProvider, makeDecoratable } from "@webiny/app-admin";
import { AcoWithConfig } from "@webiny/app-aco";
import { Table as CmsAcoTable } from "./Table/index.js";
import { useModel } from "~/admin/components/ModelProvider/index.js";
import {
    ContentEntryEditorWithConfig,
    ContentEntryListWithConfig
} from "~/admin/config/contentEntries/index.js";
import { ContentEntriesProvider } from "~/admin/views/contentEntries/ContentEntriesContext.js";
import { ContentEntriesDebounceRenderer } from "~/admin/views/contentEntries/ContentEntriesDebounceRender.js";
import { ModelIsBeingDeletedError } from "~/admin/components/ContentModelEditor/ModelIsBeingDeletedError/index.js";

export const ContentEntries = makeDecoratable("ContentEntries", () => {
    const { model } = useModel();

    if (model.isBeingDeleted) {
        return <ModelIsBeingDeletedError model={model} />;
    }

    return (
        <ContentEntriesProvider contentModel={model} key={model.modelId}>
            <ContentEntryListWithConfig>
                <ContentEntryEditorWithConfig>
                    <AcoWithConfig>
                        <DialogsProvider>
                            <ContentEntriesDebounceRenderer>
                                <CmsAcoTable />
                            </ContentEntriesDebounceRenderer>
                        </DialogsProvider>
                    </AcoWithConfig>
                </ContentEntryEditorWithConfig>
            </ContentEntryListWithConfig>
        </ContentEntriesProvider>
    );
});
