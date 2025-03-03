import React from "react";
import { useSidebar } from "./SidebarProvider";
import { IconButton, type IconButtonProps } from "~/Button";
import {makeDecoratable} from "@webiny/react-composition";

interface SidebarIconProps extends Omit<IconButtonProps, "icon"> {
    element?: React.ReactNode;
}

const SidebarIconBase = ({ element, ...props }: SidebarIconProps) => {
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

const SidebarIcon = makeDecoratable("SidebarIcon", SidebarIconBase);

export { SidebarIcon, type SidebarIconProps };
