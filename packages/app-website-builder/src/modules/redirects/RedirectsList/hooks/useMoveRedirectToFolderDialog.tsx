import { useCallback } from "react";
import { useSnackbar } from "@webiny/app-admin";
import { useMoveToFolderDialog } from "@webiny/app-aco";
import type { DocumentDto } from "~/modules/redirects/RedirectsList/presenters/index.js";
import { useMoveRedirect } from "~/features/redirects/index.js";

interface UseMoveRedirectToFolderDialog {
    redirect: DocumentDto;
}

export function useMoveRedirectToFolderDialog({ redirect }: UseMoveRedirectToFolderDialog) {
    const { showSnackbar } = useSnackbar();
    const { showDialog } = useMoveToFolderDialog();
    const { moveRedirect } = useMoveRedirect();

    const openMoveRedirectToFolderDialog = useCallback(() => {
        if (redirect.$type === "FOLDER") {
            return;
        }

        showDialog({
            title: "Move redirect to a new location",
            message: "Select a new location for this redirect:",
            loadingLabel: "Moving redirect...",
            acceptLabel: "Move redirect",
            focusedFolderId: redirect.data.location.folderId,
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
