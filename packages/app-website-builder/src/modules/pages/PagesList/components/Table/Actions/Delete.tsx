import React from "react";
import { ReactComponent as DeleteIcon } from "@webiny/icons/delete.svg";
import { usePage } from "~/modules/pages/PagesList/hooks/usePage.js";
import { useDeletePageConfirmationDialog } from "~/modules/pages/PagesList/hooks/useDeletePageConfirmationDialog.js";
import { PageListConfig } from "~/modules/pages/configs/index.js";

export const Delete = () => {
    const { page } = usePage();
    const { openDeletePageConfirmationDialog } = useDeletePageConfirmationDialog({ page });
    const { OptionsMenuItem } = PageListConfig.Browser.Page.Action;

    return (
        <OptionsMenuItem
            icon={<DeleteIcon />}
            label={"Delete"}
            onAction={openDeletePageConfirmationDialog}
            className={"!wby-text-destructive-primary [&_svg]:wby-fill-destructive"}
        />
    );
};
