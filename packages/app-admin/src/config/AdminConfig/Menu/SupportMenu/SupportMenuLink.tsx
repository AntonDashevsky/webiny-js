import React, { useMemo } from "react";
import { makeDecoratable } from "~/index";
import { DropdownMenu, DropdownMenuLinkProps } from "@webiny/admin-ui";
import { type BaseSupportMenuItemProps } from "./types";

export type SupportMenuLinkProps = BaseSupportMenuItemProps & DropdownMenuLinkProps;

const SupportMenuLinkBase = ({ label, icon, ...linkProps }: SupportMenuLinkProps) => {
    const mappedProps = useMemo(() => {
        return {
            ...linkProps,
            icon,
            content: label
        };
    }, [label, icon, linkProps]);

    return <DropdownMenu.Link {...mappedProps} />;
};

export const SupportMenuLink = makeDecoratable("SupportMenuLink", SupportMenuLinkBase);
