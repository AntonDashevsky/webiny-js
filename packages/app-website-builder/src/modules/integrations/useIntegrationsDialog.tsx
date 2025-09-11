import React from "react";
import { useDialogs } from "@webiny/app-admin";
import { IntegrationsSettings } from "./IntegrationsSettings.js";
import {
    useEcommerceApiProvider,
    useGetEcommerceSettings,
    useUpdateEcommerceSettings
} from "~/features/index.js";
import { useToast } from "@webiny/admin-ui";

export const useIntegrationsDialog = () => {
    const { showSuccessToast } = useToast();
    const dialogs = useDialogs();
    const provider = useEcommerceApiProvider();
    const manifests = provider.getApiManifests();
    const { getSettings } = useGetEcommerceSettings();
    const { updateSettings } = useUpdateEcommerceSettings();

    const noIntegrations = manifests.length === 0;

    const showIntegrationsDialog = () => {
        dialogs.showDialog({
            title: `Website Builder Integrations`,
            formData: getSettings,
            description: "Configure your website builder integrations here.",
            acceptLabel: noIntegrations ? null : "Save Settings",
            cancelLabel: noIntegrations ? "Close" : "Cancel",
            content: <IntegrationsSettings manifests={manifests} />,
            onAccept: async data => {
                await updateSettings(data);
                showSuccessToast({
                    title: "Success!",
                    description: "Integrations settings were saved successfully.",
                    duration: 3000
                });
            }
        });
    };

    return { showIntegrationsDialog };
};
