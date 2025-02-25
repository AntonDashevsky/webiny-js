import React from "react";
import { Icon, type IconProps } from "~/Icon";
import { useSidebar } from "./SidebarProvider";

interface SidebarIconProps extends Omit<IconProps, "icon"> {
    element?: React.ReactNode;
}

const SidebarIcon = ({ element, ...props }: SidebarIconProps) => {
    const { toggleSidebar } = useSidebar();
    return (
        <Icon
            icon={element}
            size={"lg"}
            color={"neutral-strong"}
            className={"wby-cursor-pointer"}
            onClick={toggleSidebar}
            {...props}
        />
    );
};

export { SidebarIcon, type SidebarIconProps };
