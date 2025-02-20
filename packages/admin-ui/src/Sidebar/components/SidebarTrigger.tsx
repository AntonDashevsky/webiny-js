import React from "react";
import { IconButton } from "~/Button";
import { useSidebar } from "./SidebarProvider";
import { ReactComponent as ToggleSidebarIcon } from "@material-design-icons/svg/outlined/chrome_reader_mode.svg";

const SidebarTrigger = () => {
    const { toggleSidebar } = useSidebar();

    return (
        <IconButton
            icon={<ToggleSidebarIcon />}
            data-sidebar="trigger"
            size="xs"
            variant={"ghost"}
            onClick={toggleSidebar}
        />
    );
};

export { SidebarTrigger };
