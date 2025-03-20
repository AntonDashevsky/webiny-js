import React from "react";
import { DropdownMenuItem, type DropdownMenuItemLinkProps } from "./DropdownMenuItem";
import { makeDecoratable, withStaticProps } from "~/utils";
import { DropdownMenuItemIcon } from "./DropdownMenuItemIcon";

const DropdownMenuLinkBase = (props: DropdownMenuItemLinkProps) => {
    return <DropdownMenuItem {...props} />;
};

const DecoratableDropdownMenuLink = makeDecoratable("DropdownMenuLink", DropdownMenuLinkBase);

const DropdownMenuLink = withStaticProps(DecoratableDropdownMenuLink, {
    Icon: DropdownMenuItemIcon
});

export { DropdownMenuLink };
