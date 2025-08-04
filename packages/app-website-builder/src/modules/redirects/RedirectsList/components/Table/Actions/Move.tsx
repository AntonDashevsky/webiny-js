import React from "react";
import { ReactComponent as MoveIcon } from "@webiny/icons/exit_to_app.svg";
import { useMoveRedirectToFolderDialog } from "~/modules/redirects/RedirectsList/hooks/useMoveRedirectToFolderDialog.js";
import { useDocument } from "~/modules/redirects/RedirectsList/hooks/useDocument.js";
import { RedirectListConfig } from "~/modules/redirects/configs";

export const Move = () => {
    const { document } = useDocument();
    const { openMoveRedirectToFolderDialog } = useMoveRedirectToFolderDialog({
        redirect: document
    });
    const { OptionsMenuItem } = RedirectListConfig.Browser.Record.Action;

    return (
        <OptionsMenuItem
            icon={<MoveIcon />}
            label={"Move"}
            onAction={openMoveRedirectToFolderDialog}
        />
    );
};
