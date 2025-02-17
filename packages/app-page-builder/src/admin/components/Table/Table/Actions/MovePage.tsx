import React from "react";
import { ReactComponent as Move } from "@material-design-icons/svg/outlined/drive_file_move.svg";
import { makeDecoratable } from "@webiny/app-admin";
import { PageListConfig } from "~/admin/config/pages/index.js";
import { usePage } from "~/admin/views/Pages/hooks/usePage.js";
import { useMovePageToFolder } from "~/admin/views/Pages/hooks/useMovePageToFolder.js";

export const MovePage = makeDecoratable("MovePage", () => {
    const { page } = usePage();
    const movePageToFolder = useMovePageToFolder({ record: page });
    const { OptionsMenuItem } = PageListConfig.Browser.PageAction;

    return (
        <OptionsMenuItem
            icon={<Move />}
            label={"Move"}
            onAction={movePageToFolder}
            data-testid={"aco.actions.pb.page.move"}
        />
    );
});
