import React from "react";
import { type CmsIdentity } from "~/types.js";
import { Box } from "./Box.js";
import { TimeAgo } from "@webiny/ui/TimeAgo/index.js";

interface CreatedByProps {
    createdBy: CmsIdentity;
    createdOn: Date;
}
export const CreatedBy = ({ createdBy, createdOn }: CreatedByProps) => {
    return (
        <Box icon={null} name={"Created By"}>
            {createdBy.displayName} <br />
            <TimeAgo datetime={createdOn} />
        </Box>
    );
};
