import React from "react";
import { useDialogs } from "@webiny/app-admin";
import { WebsiteBuilderSettings } from "./WebsiteBuilderSettings";

export const useSettingsDialog = () => {
    const dialogs = useDialogs();

    const showSettingsDialog = () => {
        dialogs.showDialog({
            title: `Website Builder Settings`,
            acceptLabel: "Save Settings",
            cancelLabel: "Cancel",
            content: <WebsiteBuilderSettings />,
            onAccept: data => {
                console.log(data);
            }
        });
    }

    return { showSettingsDialog }
}
