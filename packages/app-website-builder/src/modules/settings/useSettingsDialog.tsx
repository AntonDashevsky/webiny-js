import React from "react";
import { useDialogs } from "@webiny/app-admin";
import { useToast } from "@webiny/admin-ui";
import { WebsiteBuilderSettings } from "./WebsiteBuilderSettings";
import { useGetWebsiteBuilderSettings, useUpdateWebsiteBuilderSettings } from "~/features";

export const useSettingsDialog = () => {
    const { showToast } = useToast();
    const dialogs = useDialogs();
    const { getSettings } = useGetWebsiteBuilderSettings();
    const { updateSettings } = useUpdateWebsiteBuilderSettings();

    type SettingsType = Awaited<ReturnType<typeof getSettings>>;

    const showSettingsDialog = () => {
        dialogs.showDialog({
            formData: () => getSettings(),
            title: "Website Builder Settings",
            acceptLabel: "Save Settings",
            cancelLabel: "Cancel",
            loadingLabel: "Saving...",
            content: <WebsiteBuilderSettings />,
            onAccept: async data => {
                await updateSettings(data as SettingsType);
                showToast({
                    title: "Success!",
                    description: "Settings were saved successfully.",
                    duration: 3000
                });
            }
        });
    };

    return { showSettingsDialog };
};
