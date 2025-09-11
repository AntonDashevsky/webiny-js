import React, { useCallback } from "react";
import { useDeletePage } from "~/features/pages/index.js";
import { useConfirmationDialog, useSnackbar } from "@webiny/app-admin";
import type { PageDto } from "~/domain/Page/index.js";

interface UseDeletePageConfirmationDialogProps {
    page: PageDto;
}

export const useDeletePageConfirmationDialog = ({ page }: UseDeletePageConfirmationDialogProps) => {
    const { deletePage } = useDeletePage();
    const { showSnackbar } = useSnackbar();

    const { showConfirmation } = useConfirmationDialog({
        title: "Delete page",
        message: (
            <p>
                You are about to permanently delete <strong>{page.properties.title}</strong> and all
                of its revisions. Are you sure you want to continue?
            </p>
        )
    });

    const openDeletePageConfirmationDialog = useCallback(
        () =>
            showConfirmation(async () => {
                try {
                    await deletePage({ id: page.id });
                    showSnackbar(`${page.properties.title} was deleted successfully!`);
                } catch (ex) {
                    showSnackbar(ex.message || `Error while deleting ${page.properties.title}`);
                }
            }),
        [page]
    );

    return { openDeletePageConfirmationDialog };
};
