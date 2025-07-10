import React from "react";
import { useDialogs } from "@webiny/app-admin";
import { IntegrationsSettings } from "./IntegrationsSettings";

export const useIntegrationsDialog = () => {
    const dialogs = useDialogs();

    const showIntegrationsDialog = () => {
        dialogs.showDialog({
            title: `Website Builder Integrations`,
            description: "Configure your website builder integrations",
            dismissible: false,
            acceptLabel: "Save Settings",
            cancelLabel: "Cancel",
            content: <IntegrationsSettings />,
            onAccept: data => {
                console.log(data);
            }
        });
    };

    return { showIntegrationsDialog };
};
