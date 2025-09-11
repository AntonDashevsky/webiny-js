import { useCallback } from "react";
import { useSnackbar } from "@webiny/app-admin";
import { useMoveToFolderDialog } from "@webiny/app-aco";
import { useMoveRedirect } from "~/features/redirects/index.js";
import type { RedirectDto } from "~/domain/Redirect/index.js";

interface UseMoveRedirectToFolderDialog {
    redirect: RedirectDto;
}

export function useMoveRedirectToFolderDialog({ redirect }: UseMoveRedirectToFolderDialog) {
    const { showSnackbar } = useSnackbar();
    const { showDialog } = useMoveToFolderDialog();
    const { moveRedirect } = useMoveRedirect();

    const openMoveRedirectToFolderDialog = useCallback(() => {
        showDialog({
            title: "Move redirect to a new location",
            message: "Select a new location for this redirect:",
            loadingLabel: "Moving redirect...",
            acceptLabel: "Move redirect",
            focusedFolderId: redirect.location.folderId,
            async onAccept({ folder }) {
                await moveRedirect({
                    id: redirect.id,
                    folderId: folder.id
                });
                showSnackbar(
                    `Redirect "${redirect.title}" was successfully moved to folder "${folder.label}"!`
                );
            }
        });
    }, [redirect.id]);

    return {
        openMoveRedirectToFolderDialog
    };
}
