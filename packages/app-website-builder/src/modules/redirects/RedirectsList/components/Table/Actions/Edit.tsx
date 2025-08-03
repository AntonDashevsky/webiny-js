import React from "react";
import { ReactComponent as EditIcon } from "@webiny/icons/edit.svg";
import { RedirectListConfig } from "~/modules/redirects/configs";
import { useEditRedirectDialog } from "~/modules/redirects/RedirectsList/hooks/useEditRedirectDialog";
import { useDocument } from "~/modules/redirects/RedirectsList/hooks/useDocument.js";

export const Edit = () => {
    const { document } = useDocument();
    const { showEditRedirectDialog } = useEditRedirectDialog(document.id);
    const { OptionsMenuItem } = RedirectListConfig.Browser.Record.Action;

    return (
        <OptionsMenuItem icon={<EditIcon />} label={"Edit"} onAction={showEditRedirectDialog} />
    );
};
