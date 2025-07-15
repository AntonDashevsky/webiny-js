import React from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { IconButton } from "@webiny/admin-ui";
import { ReactComponent as SettingsIcon } from "@webiny/icons/settings.svg";
import { useDialogs } from "@webiny/app-admin";
import { SettingsDialogBody } from "./Settings/SettingsDialogBody";
import { useDocumentEditor } from "~/DocumentEditor";

export const SettingsButton = observer(() => {
    const dialogs = useDialogs();
    const editor = useDocumentEditor();

    const formData = {
        properties: editor.getDocumentState().read().properties,
        metadata: editor.getDocumentState().read().metadata
    };

    const showDialog = () => {
        dialogs.showDialog({
            title: "Page Settings",
            description: "This dialog contain various page related settings.",
            dismissible: false,
            acceptLabel: "Save Settings",
            formData: structuredClone(toJS(formData)),
            content: <SettingsDialogBody />,
            onAccept: data => {
                editor.updateDocument(document => {
                    document.properties = data.properties;
                    document.metadata = data.metadata;
                });
            }
        });
    };

    return (
        <div className={"wby-flex wby-gap-x-sm"}>
            <IconButton
                variant="secondary"
                icon={<SettingsIcon />}
                onClick={showDialog}
            ></IconButton>
        </div>
    );
});
