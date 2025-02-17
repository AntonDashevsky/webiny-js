import { makeDecoratable } from "@webiny/react-composition";
import { ListItemGraphic } from "@webiny/ui/List/index.js";
import { Icon } from "@webiny/ui/Icon/index.js";
import { ReactComponent as PublishIcon } from "~/admin/icons/publish.svg";
import React from "react";
import { i18n } from "@webiny/app/i18n/index.js";

const t = i18n.ns("app-headless-cms/admin/plugins/content-details/content-revisions");

const PublishEntryRevisionListItemComponent = () => {
    return (
        <>
            <ListItemGraphic>
                <Icon icon={<PublishIcon />} />
            </ListItemGraphic>
            {t`Publish revision`}
        </>
    );
};

export const PublishEntryRevisionListItem = makeDecoratable(
    "PublishEntryRevisionListItem",
    PublishEntryRevisionListItemComponent
);
