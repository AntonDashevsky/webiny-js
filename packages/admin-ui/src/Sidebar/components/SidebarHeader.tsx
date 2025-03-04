import React from "react";
import { Separator } from "~/Separator";
import { IconButton } from "~/Button";
import { useSidebar } from "./SidebarProvider";
import { ReactComponent as ToggleSidebarIcon } from "@material-design-icons/svg/outlined/chrome_reader_mode.svg";
import { ReactComponent as AbsToggleSidebarIcon } from "@material-design-icons/svg/outlined/keyboard_double_arrow_right.svg";

interface SidebarHeaderProps extends Omit<React.ComponentProps<"div">, "title"> {
    icon?: React.ReactNode;
    title?: React.ReactNode;
}

const SidebarHeader = ({ title, icon }: SidebarHeaderProps) => {
    const { toggleSidebar, open } = useSidebar();

    return (
        <>
            <div className={"wby-px-xs-plus"}>
                <div
                    data-sidebar="header"
                    className={
                        "wby-flex wby-justify-between wby-items-center wby-gap-sm wby-py-xs-plus wby-px-xs wby-overflow-x-hidden"
                    }
                >
                    <div className={"wby-flex wby-items-center wby-gap-x-sm"}>
                        {icon}
                        <span className={"wby-text-md wby-font-semibold wby-truncate"}>
                            {title}
                        </span>
                        <IconButton
                            className={
                                "wby-absolute wby-right-[-10px] wby-hidden group-data-[state=collapsed]:group-[:not(.transitioning)]:group-hover:wby-flex"
                            }
                            icon={<AbsToggleSidebarIcon />}
                            data-sidebar="trigger"
                            size="xs"
                            variant={"secondary"}
                            onClick={toggleSidebar}
                        />
                    </div>

                    {open && (
                        <IconButton
                            icon={<ToggleSidebarIcon />}
                            data-sidebar="trigger"
                            size="xs"
                            variant={"ghost"}
                            onClick={toggleSidebar}
                        />
                    )}
                </div>
            </div>
            <div className={"wby-px-sm wby-py-xs"}>
                <Separator variant={"subtle"} margin={"xs"} />
            </div>
        </>
    );
};

export { SidebarHeader, type SidebarHeaderProps };
