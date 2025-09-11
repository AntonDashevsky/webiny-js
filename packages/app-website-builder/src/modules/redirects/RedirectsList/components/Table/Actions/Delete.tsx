import React from "react";
import { ReactComponent as DeleteIcon } from "@webiny/icons/delete.svg";
import { useRedirect } from "~/modules/redirects/RedirectsList/hooks/useRedirect.js";
import { useDeleteRedirectConfirmationDialog } from "~/modules/redirects/RedirectsList/hooks/useDeleteRedirectConfirmationDialog.js";
import { RedirectListConfig } from "~/modules/redirects/configs";

export const Delete = () => {
    const { redirect } = useRedirect();
    const { openDeleteRedirectConfirmationDialog } = useDeleteRedirectConfirmationDialog({
        redirect
    });

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
