import React from "react";
import { ReactComponent as DuplicateIcon } from "@webiny/icons/library_add.svg";
import { makeDecoratable } from "@webiny/app-admin";
import { DefaultDuplicatePage } from "./DefaultDuplicatePage.js";
import { DuplicatePageMenuItem } from "./DuplicatePageMenuItem.js";

export interface DuplicatePageProps {
    icon?: React.ReactElement;
    label?: React.ReactNode;
    onClick?: () => void;
}

export const DuplicatePage = makeDecoratable("DuplicatePage", (props: DuplicatePageProps) => {
    const duplicateButtonLabel = "Duplicate";

    if (!props.onClick) {
        return (
            <DefaultDuplicatePage
                label={props.label ?? duplicateButtonLabel}
                icon={props.icon ?? <DuplicateIcon />}
            />
        );
    }

    return (
        <DuplicatePageMenuItem
            label={props.label ?? duplicateButtonLabel}
            icon={props.icon ?? <DuplicateIcon />}
            onClick={props.onClick}
        />
    );
});
