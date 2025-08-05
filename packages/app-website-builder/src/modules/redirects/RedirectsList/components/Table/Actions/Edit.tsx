import React from "react";
import { ReactComponent as EditIcon } from "@webiny/icons/edit.svg";
import { RedirectListConfig } from "~/modules/redirects/configs";
import { useEditRedirectDialog } from "~/modules/redirects/RedirectsList/hooks/useEditRedirectDialog";
import { useRedirect } from "~/modules/redirects/RedirectsList/hooks/useRedirect.js";

const { OptionsMenuItem } = RedirectListConfig.Browser.Record.Action;

export const Edit = () => {
    const { redirect } = useRedirect();
    const { showEditRedirectDialog } = useEditRedirectDialog();

    return (
        <OptionsMenuItem
            icon={<EditIcon />}
            label={"Edit"}
            onAction={() => showEditRedirectDialog(redirect.id)}
        />
    );
};
