import React from "react";
import { Tooltip } from "@webiny/ui/Tooltip/index.js";
import { IconButton } from "@webiny/ui/Button/index.js";

export interface ActionButtonProps {
    label: string;
    icon: JSX.Element;
    onAction: () => void;
    "data-testid"?: string;
    disabled?: boolean;
}

export const ActionButton = ({ label, icon, onAction, disabled, ...props }: ActionButtonProps) => {
    return (
        <Tooltip content={<span>{label}</span>} placement={"bottom"}>
            <IconButton
                icon={icon}
                onClick={onAction}
                disabled={disabled}
                data-testid={props["data-testid"]}
            />
        </Tooltip>
    );
};
