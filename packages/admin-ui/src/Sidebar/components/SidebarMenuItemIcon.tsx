import React from "react";
import { Icon, type IconProps } from "~/Icon";
import { makeDecoratable } from "@webiny/react-composition";

interface SidebarMenuItemIconProps extends Omit<IconProps, "icon"> {
    element?: React.ReactNode;
}

const SidebarMenuItemIconBase = ({ element, ...props }: SidebarMenuItemIconProps) => {
    return <Icon icon={element} size={"sm"} color={"neutral-light"} {...props} />;
};

const SidebarMenuItemIcon = makeDecoratable("SidebarMenuItemIcon", SidebarMenuItemIconBase);

export { SidebarMenuItemIcon, type SidebarMenuItemIconProps };
