import React from "react";
import { Typography } from "@webiny/ui/Typography/index.js";
import { Button, Icon, IconContainer } from "./TrashBin.styled.js";

export interface TrashBinButtonProps {
    onClick: () => void;
}

export const TrashBinButton = (props: TrashBinButtonProps) => {
    return (
        <Button onClick={props.onClick}>
            <IconContainer>
                <Icon />
            </IconContainer>
            <Typography use={"subtitle2"}>{"Trash"}</Typography>
        </Button>
    );
};
