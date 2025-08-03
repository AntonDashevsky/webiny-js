import React, { useCallback } from "react";
import { useDeleteRedirect } from "~/features/redirects/index.js";
import { useConfirmationDialog, useSnackbar } from "@webiny/app-admin";
import type { DocumentDto } from "~/modules/redirects/RedirectsList/presenters/index.js";

interface UseDeleteRedirectConfirmationDialogProps {
    redirect: DocumentDto;
}

export const useDeleteRedirectConfirmationDialog = ({ redirect }: UseDeleteRedirectConfirmationDialogProps) => {
    const { deleteRedirect } = useDeleteRedirect();
    const { showSnackbar } = useSnackbar();

    const { showConfirmation } = useConfirmationDialog({
        title: "Delete redirect",
        message: (
            <p>
                You are about to permanently delete redirect <strong>{redirect.title}</strong>. Are you sure you want to continue?
            </p>
        )
    });

    const openDeleteRedirectConfirmationDialog = useCallback(
        () =>
            showConfirmation(async () => {
                try {
                    await deleteRedirect({ id: redirect.id });
                    showSnackbar(`${redirect.title} was deleted successfully!`);
                } catch (ex) {
                    showSnackbar(ex.message || `Error while deleting ${redirect.title}`);
                }
            }),
        [redirect]
    );

    return { openDeleteRedirectConfirmationDialog };
};
