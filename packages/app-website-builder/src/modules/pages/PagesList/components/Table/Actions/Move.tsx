import React from "react";
import { ReactComponent as MoveIcon } from "@webiny/icons/exit_to_app.svg";
import { PageListConfig } from "~/modules/pages/configs";
import { useMovePageToFolderDialog } from "~/modules/pages/PagesList/hooks/useMovePageToFolderDialog.js";
import { usePage } from "~/modules/pages/PagesList/hooks/usePage.js";

export const Move = () => {
    const { page } = usePage();
    const { openMovePageToFolderDialog } = useMovePageToFolderDialog({ page });
    const { OptionsMenuItem } = PageListConfig.Browser.Page.Action;

    return (
        <OptionsMenuItem icon={<MoveIcon />} label={"Move"} onAction={openMovePageToFolderDialog} />
    );
};
