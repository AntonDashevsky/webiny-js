import React, { useMemo } from "react";
import { makeDecoratable } from "~/index";
import { DropdownMenu, DropdownMenuItemProps } from "@webiny/admin-ui";
import { type BaseSupportMenuItemProps } from "./types";

export type SupportMenuItemProps = BaseSupportMenuItemProps & DropdownMenuItemProps;

const SupportMenuItemBase = ({ label, icon, ...itemProps }: SupportMenuItemProps) => {
    const mappedProps = useMemo(() => {
        return {
            ...itemProps,
            icon,
            content: label
        };
    }, [label, itemProps]);

    return <DropdownMenu.Item {...mappedProps} />;
};

export const SupportMenuItem = makeDecoratable("SupportMenuItem", SupportMenuItemBase);
