import React from "react";
import { ReactComponent as DraftIcon } from "./assets/status-draft.svg";
import { ReactComponent as PublishedIcon } from "./assets/status-published.svg";
import { ReactComponent as UnpublishedIcon } from "./assets/status-unpublished.svg";
import { Box } from "./Box.js";
import { CmsContentEntryStatusType } from "~/types.js";

const getIcon = (status: CmsContentEntryStatusType) => {
    switch (status) {
        case "published":
            return <PublishedIcon />;
        case "unpublished":
            return <UnpublishedIcon />;
        case "draft":
            return <DraftIcon />;
        default:
            return null;
    }
};

interface StatusProps {
    status: CmsContentEntryStatusType;
}
export const Status = ({ status }: StatusProps) => {
    return (
        <Box icon={getIcon(status)} name={"Status"}>
            {status.toUpperCase()}
        </Box>
    );
};
