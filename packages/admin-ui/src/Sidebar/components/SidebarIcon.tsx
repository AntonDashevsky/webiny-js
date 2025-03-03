import React from "react";
import { useSidebar } from "./SidebarProvider";
import { IconButton, type IconButtonProps } from "~/Button";

interface SidebarIconProps extends Omit<IconButtonProps, "icon"> {
    element?: React.ReactNode;
}

const SidebarIcon = ({ element, ...props }: SidebarIconProps) => {
    const { toggleSidebar } = useSidebar();
    return (
        <IconButton
            icon={element}
            iconSize={"lg"}
            variant={"ghost"}
            className={"wby-p-0"}
            onClick={toggleSidebar}
            {...props}
        />
    );
};

export { SidebarIcon, type SidebarIconProps };
