import React from "react";
import { IconButton, Text, Tooltip } from "@webiny/admin-ui";
import { ReactComponent as RefreshIcon } from "@webiny/icons/refresh.svg";
import { useDocumentEditor } from "~/DocumentEditor";

export const RefreshIframe = () => {
    const editor = useDocumentEditor();

    const refresh = () => {
        editor.updateDocument(document => {
            const url = new URL(document.metadata.lastPreviewUrl);
            url.searchParams.set("wb.ts", Date.now().toString());
            document.metadata.lastPreviewUrl = url.toString();
        });

        editor.updateEditor(state => {
            // Unset boxes to remove old overlays.
            state.loadingPreview = true;
            state.boxes = {
                preview: {},
                editor: {}
            };
        });
    };

    return (
        <Tooltip
            content={<Text size="md">Refresh preview</Text>}
            side="bottom"
            trigger={
                <IconButton icon={<RefreshIcon />} size="md" onClick={refresh} variant={"ghost"} />
            }
        />
    );
};
