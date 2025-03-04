import React, { useEffect } from "react";
import { Separator } from "~/Separator";
import { IconButton } from "~/Button";
import { useSidebar } from "./SidebarProvider";
import { ReactComponent as OpenSidebarIcon } from "@material-design-icons/svg/outlined/keyboard_double_arrow_right.svg";
import { ReactComponent as CloseSidebarIcon } from "@material-design-icons/svg/outlined/chrome_reader_mode.svg";

interface SidebarHeaderProps extends Omit<React.ComponentProps<"div">, "title"> {
    icon?: React.ReactNode;
    title?: React.ReactNode;
}

const SidebarHeader = ({ title, icon }: SidebarHeaderProps) => {
    const { toggleSidebar, open } = useSidebar();

    const [closingInProgress, setClosingInProgress] = React.useState(false);

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
                        {!closingInProgress && (
                            <IconButton
                                className={
                                    "wby-absolute wby-right-[-10px] wby-hidden group-data-[state=collapsed]:group-hover:wby-flex"
                                }
                                icon={<OpenSidebarIcon />}
                                data-sidebar="trigger"
                                size="xs"
                                variant={"secondary"}
                                onClick={toggleSidebar}
                            />
                        )}
                    </div>

                    {open && (
                        <IconButton
                            icon={<CloseSidebarIcon />}
                            data-sidebar="trigger"
                            size="xs"
                            variant={"ghost"}
                            onClick={() => {
                                setClosingInProgress(true);
                                setTimeout(() => {
                                    setClosingInProgress(false);
                                }, 200);

                                toggleSidebar();
                            }}
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
