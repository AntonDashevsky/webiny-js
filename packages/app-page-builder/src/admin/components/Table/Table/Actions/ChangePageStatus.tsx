import React from "react";
import { ReactComponent as Publish } from "@material-design-icons/svg/outlined/publish.svg";
import { ReactComponent as Unpublish } from "@material-design-icons/svg/outlined/settings_backup_restore.svg";
import { PageListConfig } from "~/admin/config/pages/index.js";
import { usePage } from "~/admin/views/Pages/hooks/usePage.js";
import { useChangePageStatus } from "~/admin/views/Pages/hooks/useChangePageStatus.js";
import { makeDecoratable } from "@webiny/react-composition";

export const ChangePageStatus = makeDecoratable("ChangePageStatus", () => {
    const { page } = usePage();
    const { openDialogUnpublishPage, openDialogPublishPage } = useChangePageStatus({ page });
    const { OptionsMenuItem } = PageListConfig.Browser.PageAction;

    if (page.data.status === "published") {
        return (
            <OptionsMenuItem
                icon={<Unpublish />}
                label={"Unpublish"}
                onAction={openDialogUnpublishPage}
                data-testid={"aco.actions.pb.page.unpublish"}
            />
        );
    }

    return (
        <OptionsMenuItem
            icon={<Publish />}
            label={"Publish"}
            onAction={openDialogPublishPage}
            data-testid={"aco.actions.pb.page.publish"}
        />
    );
});
