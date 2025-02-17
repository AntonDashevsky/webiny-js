import React from "react";
import { ListItemTextSecondary } from "@webiny/ui/List/index.js";
import { TimeAgo } from "@webiny/ui/TimeAgo/index.js";

export interface DescriptionProps {
    children?: string;
    createdOn: string;
}

export const Description = (props: DescriptionProps) => {
    return (
        <ListItemTextSecondary>
            {"Created"} <TimeAgo datetime={props.createdOn} />
            {props.children && ` - ${props.children}`}
        </ListItemTextSecondary>
    );
};
