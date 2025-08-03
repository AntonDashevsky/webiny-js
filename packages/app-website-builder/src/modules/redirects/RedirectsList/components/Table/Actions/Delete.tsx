import React from "react";
import { ReactComponent as DeleteIcon } from "@webiny/icons/delete.svg";
import { useDocument } from "~/modules/redirects/RedirectsList/hooks/useDocument.js";
import { useDeleteRedirectConfirmationDialog } from "~/modules/redirects/RedirectsList/hooks/useDeleteRedirectConfirmationDialog.js";
import { RedirectListConfig } from "~/modules/redirects/configs";

export const Delete = () => {
    const { document } = useDocument();
    const { openDeleteRedirectConfirmationDialog } = useDeleteRedirectConfirmationDialog({ redirect: document });
    const { OptionsMenuItem } = RedirectListConfig.Browser.Record.Action;

    return (
        <OptionsMenuItem
            icon={<DeleteIcon />}
            label={"Delete"}
            onAction={openDeleteRedirectConfirmationDialog}
            className={"!wby-text-destructive-primary [&_svg]:wby-fill-destructive"}
        />
    );
};
