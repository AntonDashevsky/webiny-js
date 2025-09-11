import React from "react";
import { ReactComponent as DuplicateIcon } from "@webiny/icons/library_add.svg";
import { usePage } from "~/modules/pages/PagesList/hooks/usePage.js";
import { useDuplicatePageConfirmationDialog } from "~/modules/pages/PagesList/hooks/useDuplicatePageConfirmationDialog.js";
import { PageListConfig } from "~/modules/pages/configs/index.js";

const { OptionsMenuItem } = PageListConfig.Browser.Page.Action;

export const Duplicate = () => {
    const { page } = usePage();
    const { openDuplicatePageConfirmationDialog } = useDuplicatePageConfirmationDialog({ page });

    return (
        <OptionsMenuItem
            icon={<DuplicateIcon />}
            label={"Duplicate"}
            onAction={openDuplicatePageConfirmationDialog}
        />
    );
};
