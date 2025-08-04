import React, { useCallback } from "react";
import { useDialogs } from "@webiny/app-admin";
import { useGetRedirect, useUpdateRedirect } from "~/features/redirects";
import { RedirectForm } from "../components/RedirectForm/RedirectForm";
import { useToast } from "@webiny/admin-ui";

export const useEditRedirectDialog = () => {
    const dialog = useDialogs();
    const { showSuccessToast } = useToast();
    const { getRedirect } = useGetRedirect();
    const { updateRedirect } = useUpdateRedirect();

    const showEditRedirectDialog = useCallback((redirectId: string) => {
        const closeDialog = dialog.showDialog({
            title: "Edit a Redirect",
            acceptLabel: "Save",
            cancelLabel: "Cancel",
            content: <RedirectForm />,
            loadingLabel: "Saving changes...",
            formData: () => getRedirect({ id: redirectId }),
            onAccept: async formData => {
                await updateRedirect({
                    id: redirectId,
                    redirectFrom: formData.redirectFrom,
                    redirectTo: formData.redirectTo,
                    redirectType: formData.redirectType,
                    isEnabled: formData.isEnabled
                });

                closeDialog();

                showSuccessToast({
                    title: "Success",
                    description: "Redirect saved successfully!"
                });
            }
        });
    }, []);

    return { showEditRedirectDialog };
};
