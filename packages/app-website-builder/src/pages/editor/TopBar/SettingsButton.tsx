import React, { useEffect } from "react";
import { toJS, observable } from "mobx";
import { IconButton } from "@webiny/admin-ui";
import { ReactComponent as SettingsIcon } from "@webiny/icons/settings.svg";
import { useDialogs } from "@webiny/app-admin";
import { SettingsDialogBody } from "./Settings/SettingsDialogBody";
import { useDocumentEditor } from "~/DocumentEditor";
import { useSelectFromDocument } from "~/BaseEditor/hooks/useSelectFromDocument";
import { EditorPage } from "~/sdk";

export const SettingsButton = () => {
    const dialogs = useDialogs();
    const editor = useDocumentEditor();
    useUpdatePreviewUrl();

    const showDialog = () => {
        dialogs.showDialog({
            title: "Page Settings",
            description: "Configure your page settings, SEO and Social metadata.",
            dismissible: false,
            acceptLabel: "Save Settings",
            formData: async () => {
                const formData = {
                    properties: editor.getDocumentState().read().properties,
                    metadata: editor.getDocumentState().read().metadata
                };
                return structuredClone(toJS(formData));
            },
            content: <SettingsDialogBody />,
            onAccept: data => {
                editor.updateDocument(document => {
                    document.properties = observable(data.properties);
                    document.metadata = observable(data.metadata);
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
};

const useUpdatePreviewUrl = () => {
    const editor = useDocumentEditor();
    const path = useSelectFromDocument<any, EditorPage>(document => {
        return document.properties.path;
    });

    useEffect(() => {
        editor.updateDocument(document => {
            const lastPreviewUrl = document.metadata.lastPreviewUrl;
            if (!lastPreviewUrl) {
                return;
            }
            const url = new URL(lastPreviewUrl);
            if (url.pathname !== path) {
                url.pathname = path;
                document.metadata.lastPreviewUrl = url.toString();
            }
        });
    }, [path]);
};
