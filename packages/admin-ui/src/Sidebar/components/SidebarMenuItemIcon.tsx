import React from "react";
import { Icon, type IconProps } from "~/Icon";

interface SidebarMenuItemIconProps extends Omit<IconProps, "icon"> {
    element?: React.ReactNode;
}

const SidebarMenuItemIcon = ({ element, ...props }: SidebarMenuItemIconProps) => {
    return <Icon icon={element} size={"sm"} color={"neutral-light"} {...props} />;
};

export { SidebarMenuItemIcon, type SidebarMenuItemIconProps };
