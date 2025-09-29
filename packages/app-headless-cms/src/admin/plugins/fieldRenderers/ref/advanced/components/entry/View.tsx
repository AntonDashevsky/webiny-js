import React from "react";
import { IconButton, Link, Tooltip } from "@webiny/admin-ui";
import { ReactComponent as ViewIcon } from "@webiny/icons/open_in_new.svg";
import { useRouter } from "@webiny/react-router";
import type { CmsReferenceContentEntry } from "~/admin/plugins/fieldRenderers/ref/components/types.js";
import { Routes } from "~/routes.js";

interface ViewProps {
    entry: CmsReferenceContentEntry;
}

export const View = ({ entry }: ViewProps) => {
    const { getLink } = useRouter();

    const folderId = entry.wbyAco_location?.folderId || "";

    const link = getLink(Routes.ContentEntries.List, {
        id: entry.id,
        modelId: entry.model.modelId,
        folderId
    });

    return (
        <Tooltip
            content={"View"}
            side={"top"}
            trigger={
                <Link to={link} target="_blank">
                    <IconButton variant={"ghost"} size={"sm"} iconSize={"lg"} icon={<ViewIcon />} />
                </Link>
            }
        />
    );
};
