import React from "react";

import { Typography } from "@webiny/ui/Typography/index.js";

import { GroupOperationLabelContainer } from "../Querybuilder.styled.js";

interface GroupOperationLabelProps {
    operation: string;
    show: boolean;
}
export const GroupOperationLabel = ({ operation, show }: GroupOperationLabelProps) => {
    if (!show) {
        return null;
    }

    return (
        <GroupOperationLabelContainer>
            <Typography use={"subtitle2"} tag={"span"}>
                {operation}
            </Typography>
        </GroupOperationLabelContainer>
    );
};
