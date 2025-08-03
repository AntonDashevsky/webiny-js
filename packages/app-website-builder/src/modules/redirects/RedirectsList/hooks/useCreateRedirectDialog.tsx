import React from "react";
import { useDialogs } from "@webiny/app-admin";
import { useCreateRedirect } from "~/features/redirects";
import { RedirectForm } from "../components/RedirectForm/RedirectForm";
import { useToast } from "@webiny/admin-ui";

export const useCreateRedirectDialog = (folderId: string) => {
    const dialog = useDialogs();
    const { showSuccessToast } = useToast();
    const { createRedirect } = useCreateRedirect();

    const showCreateRedirectDialog = () => {
        const closeDialog = dialog.showDialog({
            title: "Create a Redirect",
            acceptLabel: "Create",
            cancelLabel: "Cancel",
            content: <RedirectForm />,
            loadingLabel: "Creating redirect...",
            onAccept: async formData => {
                await createRedirect({
                    location: {
                        folderId
                    },
                    redirectFrom: formData.redirectFrom,
                    redirectTo: formData.redirectTo,
                    redirectType: formData.redirectType,
                    isEnabled: formData.isEnabled
                });

                closeDialog();

                showSuccessToast({
                    title: "Success",
                    description: "Redirect created successfully!"
                });
            }
        });
    };

    return { showCreateRedirectDialog };
};
